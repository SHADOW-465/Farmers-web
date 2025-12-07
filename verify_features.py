from playwright.sync_api import sync_playwright, expect
import time

def verify_app(page):
    page.on("console", lambda msg: print(f"Console log: {msg.text}"))
    page.on("pageerror", lambda exc: print(f"Page error: {exc}"))

    # 1. Dashboard
    print("Navigating to Dashboard...")
    page.goto("http://localhost:3000")
    page.wait_for_selector("text=FarmersHub")

    # 2. Weather
    print("Navigating to Weather...")
    page.goto("http://localhost:3000/weather")
    page.wait_for_selector("input[placeholder='Enter City/Village']")

    # 3. Farm Management
    print("Navigating to Farm Management...")
    page.goto("http://localhost:3000/farm-management")
    page.wait_for_load_state("networkidle")

    # Click on Market Prices tab
    print("Clicking Market Prices tab...")
    page.get_by_text("Market Prices").click()

    # Wait for content
    print("Waiting for Black Pepper...")
    page.wait_for_selector("text=Black Pepper")

    # Click on Schemes tab
    print("Clicking Schemes tab...")
    page.get_by_text("Schemes").click()
    page.wait_for_selector("text=PM-KISAN")

    # Go back to Market Prices for screenshot
    page.get_by_text("Market Prices").click()
    time.sleep(1) # wait for tab switch animation

    print("Taking screenshot...")
    page.screenshot(path="/home/jules/verification/features.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_app(page)
        except Exception as e:
            print(f"Error: {e}")
            try:
                page.screenshot(path="/home/jules/verification/error.png")
            except:
                pass
        finally:
            browser.close()
