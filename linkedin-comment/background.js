/**
 * LinkedIn Comment Generator - Background Script
 * 
 * Handles extension-level functionality that requires background processing.
 */

/**
 * Logging utility for the background script
 */
const logger = {
    // Set to true for debugging
    enabled: true,
    
    log(message, data = null) {
        if (this.enabled) {
            console.log(`[LinkedIn Comment Generator] ${message}`, data || '');
        }
    },
    
    error(message, error = null) {
        // Always log errors
        console.error(`[LinkedIn Comment Generator] ${message}`, error || '');
    }
};

/**
 * Listen for messages from content script or popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    logger.log('Received message', request);
    
    try {
        if (request.action === 'checkPermissions') {
            // Check for required permissions
            logger.log('Checking extension permissions');
            
            checkClipboardPermission()
                .then(result => sendResponse(result))
                .catch(error => {
                    logger.error('Error checking permissions', error);
                    sendResponse({ 
                        success: false, 
                        error: error.message 
                    });
                });
        } else if (request.action === 'getExtensionInfo') {
            // Return basic extension information
            sendResponse({
                success: true,
                version: chrome.runtime.getManifest().version,
                name: chrome.runtime.getManifest().name
            });
        } else if (request.action === 'generateComment') {
            // Handle API call to generate comment
            logger.log('Generating comment via background script');
            
            generateCommentViaBackground(request.data)
                .then(result => sendResponse(result))
                .catch(error => {
                    logger.error('Error generating comment', error);
                    sendResponse({ 
                        success: false, 
                        error: error.message 
                    });
                });
        }
    } catch (error) {
        logger.error('Error handling message', error);
        sendResponse({ 
            success: false, 
            error: error.message
        });
    }
    
    return true; // Keep the message channel open for async response
});

/**
 * Generate comment using the custom AI API
 * @param {Object} data - The request data containing prompt, content, etc.
 * @returns {Promise<Object>} Result of the API call
 */
async function generateCommentViaBackground(data) {
    const API_URL = 'https://sii3.top/api/gemini-dark.php';
    const MAX_RETRIES = 2;
    const TIMEOUT_MS = 10000;
    
    try {
        // Create the prompt for the custom AI server
        let prompt = `Generate a professional LinkedIn comment for the following post: "${data.content}"`;
        
        if (data.hint) {
            prompt += ` Additional context: ${data.hint}`;
        }
        
        if (data.tone && data.tone !== 'professional') {
            prompt += ` Use a ${data.tone} tone.`;
        }
        
        prompt += ' Write a brief, engaging comment (2-3 sentences) that adds value. NOTE : No markdown formatting, asterisks, or em dashes. Use natural language as if commenting on a colleague\'s post. Keep it conversational and concise.';
        
        // Prepare the request payload for custom AI server
        const payload = {
            "gemini-pro": prompt
        };
        logger.log('Sending payload to API', payload);
        
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'LinkedIn Comment Generator Extension'
            },
            body: JSON.stringify(payload),
            mode: 'cors',
            cache: 'no-cache'
        };
        
        let retries = 0;
        let response;
        
        // Retry logic with exponential backoff
        while (retries <= MAX_RETRIES) {
            try {
                logger.log(`API call attempt ${retries + 1}/${MAX_RETRIES + 1}`);
                logger.log('Making request to:', API_URL);
                logger.log('Request options:', requestOptions);
                
                // Use AbortController to implement timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
                
                response = await fetch(API_URL, {
                    ...requestOptions,
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                logger.log('Received response:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries())
                });
                break;
            } catch (error) {
                logger.error(`Fetch attempt ${retries + 1} failed:`, error);
                retries++;
                if (retries > MAX_RETRIES) {
                    throw error.name === 'AbortError' 
                        ? new Error('API request timed out') 
                        : new Error(`Network error: ${error.message}`);
                }
                // Wait before retrying (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
            }
        }
        
        if (!response.ok) {
            let errorMessage = `API error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.text(); // Use text() instead of json() to see raw response
                logger.error('API error response body:', errorData);
                errorMessage += ` - ${errorData}`;
            } catch (e) {
                logger.error('Could not read error response body:', e);
                errorMessage += ` - Unable to read response body`;
            }
            throw new Error(errorMessage);
        }
        
        let responseData;
        try {
            const responseText = await response.text();
            logger.log('Raw API response:', responseText);
            
            // Try to parse as JSON first
            try {
                responseData = JSON.parse(responseText);
                logger.log('Parsed JSON response:', responseData);
            } catch (jsonError) {
                // If it's not JSON, treat the response as plain text
                logger.log('Response is not JSON, treating as plain text');
                responseData = responseText;
            }
        } catch (textError) {
            logger.error('Could not read response as text:', textError);
            throw new Error('Failed to read API response');
        }
        
        // Handle the response from custom AI server
        // Based on your API format: [{"data": "2025-09-18", "response": "Hi! How can I help you today?", "dev": "..."}]
        let comment;
        
        if (Array.isArray(responseData) && responseData.length > 0) {
            // Your API returns an array with the response object as the first element
            const responseObj = responseData[0];
            if (responseObj && responseObj.response) {
                comment = responseObj.response;
                logger.log('Extracted comment from API response array:', comment);
            } else {
                logger.error('API response array does not contain expected response field:', responseObj);
                throw new Error('API response format invalid - missing response field in array element');
            }
        } else if (typeof responseData === 'string') {
            comment = responseData;
        } else if (responseData && typeof responseData === 'object') {
            // Fallback for other possible response formats
            if (responseData.response) {
                comment = responseData.response;
            } else if (responseData.text) {
                comment = responseData.text;
            } else if (responseData.content) {
                comment = responseData.content;
            } else if (responseData.message) {
                comment = responseData.message;
            } else if (responseData.result) {
                comment = responseData.result;
            } else {
                // If it's an object, try to get the first string value
                const values = Object.values(responseData);
                comment = values.find(val => typeof val === 'string') || JSON.stringify(responseData);
            }
        } else {
            comment = String(responseData);
        }
        
        if (!comment || comment.trim() === '') {
            throw new Error('API response missing or empty comment content');
        }
        
        logger.log('Successfully generated comment');
        return { 
            success: true, 
            comment: comment.trim() 
        };
    } catch (error) {
        logger.error('Error calling comment generation API', error);
        return { 
            success: false, 
            error: error.message 
        };
    }
}

/**
 * Check clipboard permission
 * @returns {Promise<Object>} Result of the permission check
 */
async function checkClipboardPermission() {
    try {
        // Try to write to clipboard as a test
        const testText = "Test clipboard permission";
        await navigator.clipboard.writeText(testText);
        logger.log('Clipboard permission granted');
        return { success: true };
    } catch (error) {
        logger.error('Clipboard permission denied', error);
        return { 
            success: false, 
            error: 'Clipboard access is required for copying comments.' 
        };
    }
}

/**
 * Listen for extension installation or update
 */
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        logger.log('Extension installed');
    } else if (details.reason === 'update') {
        logger.log('Extension updated', { 
            previousVersion: details.previousVersion,
            currentVersion: chrome.runtime.getManifest().version
        });
    }
});

logger.log('Background script initialized'); 