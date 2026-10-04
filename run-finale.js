/**
 * Playwright Script to Execute the `finale()` Automation Workflow on Any Website
 * + Out-of-context `#accept-btn` clicker
 * + Stops the whole script fully (closes browser & exits process) if the website is `witty-snake-472744.puter.site`
 *
 * Setup:
 *   npm init -y
 *   npm install playwright
 *   npx playwright install chromium
 *
 * Run:
 *   node run-finale.js https://kind-street-188208.puter.site
 */

const { chromium } = require('playwright');

// Starting URL (pass any URL via CLI argument or TARGET_URL env var)
const TARGET_URL =
  process.argv[2] ||
  process.env.TARGET_URL ||
  'https://kind-street-188208.puter.site';

const BROWSER_SCRIPT = () => {
  // ============================================================================
  // 1. OUT OF CONTEXT OF finale():
  //    - Stop the whole script fully if website is witty-snake-472744.puter.site
  //    - Click document.querySelector("#accept-btn") independently
  // ============================================================================
  function stopAllTimersAndExecution() {
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i <= highestId; i++) {
      window.clearTimeout(i);
      window.clearInterval(i);
    }
    window.stop();
  }

  if (
    window.location.hostname === 'witty-snake-472744.puter.site' ||
    window.location.href.includes('witty-snake-472744.puter.site')
  ) {
    stopAllTimersAndExecution();
    return;
  }

  // Click #accept-btn out of context (immediately + periodic check)
  if (document.querySelector('#accept-btn')) {
    document.querySelector('#accept-btn').click();
  }

  setInterval(() => {
    if (
      window.location.hostname === 'witty-snake-472744.puter.site' ||
      window.location.href.includes('witty-snake-472744.puter.site')
    ) {
      stopAllTimersAndExecution();
      return;
    }

    if (document.querySelector('#accept-btn')) {
      document.querySelector('#accept-btn').click();
    }
  }, 2000);

  // ============================================================================
  // 2. ORIGINAL finale() SCRIPT (UNMODIFIED LOGIC)
  // ============================================================================
  function finale() {
    // Click using coordinates with mouse simulation + console logs
    (function () {
      // Create console log display overlay
      const logContainer = document.createElement('div');
      logContainer.id = 'console-log-overlay';
      logContainer.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        width: 450px;
        height: 350px;
        background: rgba(20, 20, 20, 0.95);
        border: 2px solid #00ff00;
        border-radius: 8px;
        padding: 12px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        color: #00ff00;
        overflow-y: auto;
        z-index: 99999;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
      `;

      const header = document.createElement('div');
      header.style.cssText = `
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 1px solid #00ff00;
        padding-bottom: 5px;
        color: #00ff00;
      `;
      header.textContent = '📡 Console Logs & Coordinate Click';
      logContainer.appendChild(header);

      const logsDiv = document.createElement('div');
      logsDiv.id = 'console-logs-content';
      logsDiv.style.cssText = `
        max-height: 300px;
        overflow-y: auto;
      `;
      logContainer.appendChild(logsDiv);

      document.body.appendChild(logContainer);

      // Intercept console methods
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalInfo = console.info;

      function addLogToDisplay(message, type = 'log') {
        const logEntry = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString();
        const colors = {
          log: '#00ff00',
          error: '#ff0000',
          warn: '#ffaa00',
          info: '#00aaff',
        };

        logEntry.style.cssText = `
          color: ${colors[type]};
          margin-bottom: 4px;
          word-wrap: break-word;
          white-space: pre-wrap;
          padding: 2px 0;
          border-left: 2px solid ${colors[type]};
          padding-left: 6px;
        `;
        logEntry.textContent = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        logsDiv.appendChild(logEntry);

        // Auto-scroll to bottom
        logsDiv.scrollTop = logsDiv.scrollHeight;
      }

      // Override console methods
      console.log = function (...args) {
        originalLog.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'log'
        );
      };

      console.error = function (...args) {
        originalError.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'error'
        );
      };

      console.warn = function (...args) {
        originalWarn.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'warn'
        );
      };

      console.info = function (...args) {
        originalInfo.apply(console, args);
        addLogToDisplay(
          args
            .map((arg) =>
              typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            )
            .join(' '),
          'info'
        );
      };

      // Multiple selector strategies
      const selectors = [
        'button[aria-label="CONFIRM"]',
        'button.css-1nnj36',
        '[aria-label="CONFIRM"]',
      ];

      function clickByCoordinates(attempt = 1) {
        console.log(`🔄 Click attempt #${attempt} (coordinate-based)`);

        let element = null;
        let foundBy = '';

        // Try each selector
        for (let selector of selectors) {
          element = document.querySelector(selector);
          if (element) {
            foundBy = selector;
            break;
          }
        }

        if (!element) {
          console.error(`❌ Element not found with any selector`);
          return false;
        }

        console.log(`✓ Element found using: "${foundBy}"`);

        // Get element's bounding rectangle
        const rect = element.getBoundingClientRect();
        console.log(`  Position: top=${Math.round(rect.top)}, left=${Math.round(rect.left)}`);
        console.log(`  Size: width=${Math.round(rect.width)}, height=${Math.round(rect.height)}`);

        // Calculate center coordinates
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        console.log(`  🎯 Click coordinates: X=${Math.round(x)}, Y=${Math.round(y)}`);

        // Get document bounds
        const docWidth = window.innerWidth;
        const docHeight = window.innerHeight;

        // Verify coordinates are in view
        if (x < 0 || x > docWidth || y < 0 || y > docHeight) {
          console.error(
            `❌ Coordinates out of bounds: (${Math.round(x)}, ${Math.round(y)}) vs doc (${docWidth}x${docHeight})`
          );
          return false;
        }

        // Simulate hover
        const mouseDownEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: x,
          clientY: y,
        });
        const mouseUpEvent = new MouseEvent('mouseup', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: x,
          clientY: y,
        });
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: x,
          clientY: y,
        });

        element.dispatchEvent(mouseDownEvent);
        element.dispatchEvent(mouseUpEvent);
        element.dispatchEvent(clickEvent);

        console.log(`✓ Click event dispatched`);
        return true;
      }

      // Try clicking with increasing attempts
      let clickCount = 0;
      const maxAttempts = 15;

      function attemptClick() {
        if (clickCount < maxAttempts) {
          const success = clickByCoordinates(clickCount + 1);
          clickCount++;

          if (success) {
            console.log(`✅ Click #${clickCount} succeeded`);
            return true;
          } else {
            console.log(`ℹ️ Attempt #${clickCount} — element not ready or out of view yet`);
          }
        } else {
          console.error(`❌ Max attempts (${maxAttempts}) reached. Giving up.`);
        }

        return false;
      }

      // Try immediately
      attemptClick();

      // Try again after a short delay
      setTimeout(() => {
        attemptClick();
      }, 500);

      // Try again after a longer delay
      setTimeout(() => {
        attemptClick();
      }, 2000);
    })();

    ////////////////////////////////////////////////////////////////////////////////////////////

    function checkURLAndPopulate() {
      if (document.readyState === 'loading') {
        return;
      }

      console.log(`📍 Current URL: ${window.location.href}`);
    }

    // Run on script load
    checkURLAndPopulate();

    // Listen for route changes
    window.addEventListener('popstate', checkURLAndPopulate);

    ////////////////////////////////////////////////////////////////////////////////////////////

    // Verify we can access cross-origin content (may fail due to CORS)
    function linkvertise() {
      function getLinkvertiseId() {
        const match = window.location.href.match(/linkvertise\.com\/\?r=([a-zA-Z0-9]+)/);
        if (match) {
          console.log(`🔍 Found Linkvertise ID: ${match[1]}`);
          return match[1];
        }
        return null;
      }

      function initLinkvertise(id) {
        console.log(`🚀 Initializing Linkvertise with ID: ${id}`);

        const script = document.createElement('script');
        script.src = `https://linkvertise.com/cdn/api/v1/${id}`;
        script.onerror = () => {
          console.error(`❌ Failed to load Linkvertise script`);
        };

        script.onload = () => {
          console.log(`✓ Linkvertise script loaded`);

          // Try to access the global variable or callback set by Linkvertise
          if (typeof LinkvertiseLoader !== 'undefined') {
            console.log(`✓ LinkvertiseLoader is available`);
            LinkvertiseLoader.handle();
          } else {
            console.log(`ℹ️ LinkvertiseLoader not immediately available (normal for async)`);
          }
        };

        document.head.appendChild(script);
      }

      // Run when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          const linkvertiseId = getLinkvertiseId();
          if (linkvertiseId) {
            initLinkvertise(linkvertiseId);
          }
        });
      } else {
        const linkvertiseId = getLinkvertiseId();
        if (linkvertiseId) {
          initLinkvertise(linkvertiseId);
        }
      }
    }

    function link() {
      if (document.querySelector('body > a')) {
        document.querySelector('body > a').click();
      }
    }

    setTimeout(() => {
      next();
    }, 2000);

    setTimeout(() => {
      link();
    }, 4000);

    /////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////

    setTimeout(() => {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-link-detail-page > lv-main-content-layout > div > div.content > div > lv-link-content > div > div:nth-child(2) > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__footer > div.--button-container > div.button-desktop > a > lv-lib-button > button'
        )
      ) {
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-link-detail-page > lv-main-content-layout > div > div.content > div > lv-link-content > div > div:nth-child(2) > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__footer > div.--button-container > div.button-desktop > a > lv-lib-button > button'
          )
          .click();
      }
    }, 20000);

    setTimeout(() => {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__plans > lv-membership-plan-option:nth-child(5) > div > div'
        )
      ) {
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__plans > lv-membership-plan-option:nth-child(5) > div > div'
          )
          .click();
      }
    }, 30000);

    setTimeout(() => {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__button.membership-plan-selection__button--access.ng-star-inserted > lv-lib-button > button'
        )
      ) {
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-wait > lv-membership-selection-card > lv-lib-card > div > div > div > div.membership-plan-selection__button.membership-plan-selection__button--access.ng-star-inserted > lv-lib-button > button'
          )
          .click();
      }
    }, 40000);

    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////

    function skip() {
      if (
        document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-ad-experiment > lv-task-ad-stepper-line > lv-ad-step-nonskip > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__body > lv-lib-carousel > div > div.skip-button.ng-star-inserted > lv-lib-chip > div'
        )
      )
        document
          .querySelector(
            'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-access-page > lv-main-content-layout > div > div.content > div > lv-task-ad-experiment > lv-task-ad-stepper-line > lv-ad-step-nonskip > lv-fullsize-result-component > lv-lib-card > div > div > div > div.lv-card__body > lv-lib-carousel > div > div.skip-button.ng-star-inserted > lv-lib-chip > div'
          )
          .click();
    }
    //learn
    setTimeout(() => {
      skip();
    }, 70000);

    setTimeout(() => {
      skip();
    }, 100000);

    setTimeout(() => {
      skip();
    }, 130000);

    setTimeout(() => {
      (function () {
        // Patch 1: intercept window.open
        const originalOpen = window.open;
        window.open = function (url, target, features) {
          if (url) {
            window.location.href = url;
            return null;
          }
          return originalOpen.apply(window, arguments);
        };

        // Patch 2: intercept anchor clicks that target a new tab
        const originalAnchorClick = HTMLAnchorElement.prototype.click;
        HTMLAnchorElement.prototype.click = function () {
          if (this.target === '_blank' && this.href) {
            window.location.href = this.href;
            return;
          }
          return originalAnchorClick.call(this);
        };

        // Now find and click the actual button
        const btn = document.querySelector(
          'body > lv-root > div.layout.ng-star-inserted > div.main-container > div.content-wrapper > lv-success-page > lv-main-content-layout > div > div.content > div > lv-success-variant-a > div > lv-lib-card:nth-child(2) > div > div > div > div > lv-lib-button > button'
        );

        if (!btn) {
          console.log('Button not found — check the selector.');
          return;
        }

        btn.click();

        // Restore originals shortly after
        setTimeout(() => {
          window.open = originalOpen;
          HTMLAnchorElement.prototype.click = originalAnchorClick;
        }, 1500);
      })();
    }, 150000);
  }

  setTimeout(() => {
    finale();
    setInterval(() => {
      finale();
    }, 200000);
  }, 20000);
};

// Helper to attach Playwright listeners to every tab/page in the browser context
function attachPageHandlers(targetPage, browser) {
  const checkUrlAndAccept = async () => {
    if (targetPage.isClosed()) return;

    const currentUrl = targetPage.url();

    // 1. Out of context: If the website is witty-snake-472744.puter.site -> STOP THE WHOLE SCRIPT FULLY
    if (currentUrl.includes('witty-snake-472744.puter.site')) {
      console.log(
        `[Playwright] Reached witty-snake-472744.puter.site (${currentUrl}) -> Stopping the whole script fully!`
      );
      await browser.close().catch(() => {});
      process.exit(0);
    }

    // 2. Out of context: Click document.querySelector("#accept-btn") if it exists
    await targetPage
      .evaluate(() => {
        if (document.querySelector('#accept-btn')) {
          document.querySelector('#accept-btn').click();
        }
      })
      .catch(() => {});
  };

  targetPage.on('framenavigated', async (frame) => {
    if (frame === targetPage.mainFrame()) {
      await checkUrlAndAccept();
    }
  });

  targetPage.on('domcontentloaded', checkUrlAndAccept);
  targetPage.on('load', checkUrlAndAccept);

  targetPage.on('console', (msg) => {
    console.log(`[Browser ${msg.type().toUpperCase()}] ${msg.text()}`);
  });
}

(async () => {
  try {
    const browser = await chromium.launch({
      headless: false,
      args: ['--disable-Popup-Blocking', '--no-sandbox', '--disable-setuid-sandbox'],
    });

    browser.on('disconnected', () => {
      console.log('[Playwright] Browser disconnected. Exiting script.');
      process.exit(0);
    });

    const context = await browser.newContext({
      viewport: { width: 1366, height: 768 },
    });

    // Inject the script into every page/website loaded in this browser context
    await context.addInitScript(BROWSER_SCRIPT);

    // Ensure any newly opened tab also gets the handlers
    context.on('page', (newPage) => {
      attachPageHandlers(newPage, browser);
    });

    const page = await context.newPage();
    attachPageHandlers(page, browser);

    console.log(`[Playwright] Navigating to: ${TARGET_URL}`);
    await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  } catch (err) {
    console.error('[Playwright] Fatal error:', err);
    process.exit(1);
  }
})();
