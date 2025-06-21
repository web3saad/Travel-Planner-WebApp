// COMPREHENSIVE FIX FOR 403 FORBIDDEN ERROR

/*
 * ISSUE: When you promote a user to admin with make-admin.js, the JWT token 
 * in your browser still contains the old user role. The server is correctly
 * updating the database, but your browser's token is out of date.
 *
 * SOLUTION: You need to:
 * 1. Completely log out
 * 2. Clear cookies and local storage
 * 3. Log in again to get a fresh token with admin privileges
 */

// STEPS TO FIX:

// 1. LOG OUT FIRST
// Go to the website and click the logout button to clear the current session

// 2. CLEAR BROWSER DATA
// In Chrome: Settings > Privacy and Security > Clear browsing data
// Select "Cookies and other site data" and "Cached images and files"
// You can also run these commands in your browser console:
localStorage.clear();
sessionStorage.clear();

// 3. CLEAR AUTHENTICATION COOKIES
// This will remove the JWT token that contains your old user role
document.cookie.split(";").forEach(function(c) { 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, 
    "=;expires=" + new Date().toUTCString() + ";path=/"); 
});

// 4. REFRESH THE PAGE
window.location.reload(true);

// 5. LOG IN AGAIN
// Use your admin user credentials to log in
// You should now have admin access since you'll get a fresh token with the updated role

/*
 * If you still see the 403 error, your browser might be using a cached version
 * of the website. Try opening the site in an incognito/private window or
 * using a different browser.
 */
