CASHIER POS
Final End-to-End Flow (Real UX, Detailed)
UI Specification & API Integration
1. CASHIER LOGIN
User Story: Cashier starts shift and needs secure access to POS.
UI Layout
• Centered card (max-width ~480px)
• Header: "CASHIER POS LOGIN"
• Fields: Email Address (email), Password (password with eye icon), Remember Me
(checkbox)
• Buttons: [LOGIN] (full width, primary blue), "Forgot Password?" (text link)
• Error area: Inline, red text under form
Behaviour & API
• Validation: Email format, password required
• On Submit: Disable button + show spinner; POST /auth/login
• On Success: Save tokens to auth store, redirect to Device Selection
• On Failure: Show error message, re-enable button
2. DEVICE SELECTION
User Story: Cashier must attach to a specific terminal before selling.
UI Layout
• Title: "Select Terminal Device"
• Device list cards: Device Name, Status badge (Online/Offline), Last Active timestamp
• Buttons: [USE THIS DEVICE] on each card, Logout (top-right)
Behaviour & API
• On Mount: GET /devices with loading skeletons
• Show only devices with isActive = true
• On Use This Device: PATCH /devices/:id/heartbeat, save deviceId, navigate to POS
Terminal
• If no active devices: Show warning, only action is Logout
3. POS TERMINAL (MAIN CHECKOUT)
User Story: Cashier scans products, builds cart, takes payment.
Top Bar
• Store Name (left), Current Time auto-updating (center), Cashier Name / Device Name /
Status dot (right)
• Status dot: Green = Online, Orange = Offline
Scan & Search Area
• Large input with placeholder: "Scan barcode or type product..." (auto-focus after each
scan)
• On Enter: GET /products/barcode/:barcode if barcode format, else open Product Search
Modal
• On 404: Show "Product not found" toast
Cart Section
• Table columns: Item Name, Qty (with +/- buttons), @Price, Line Total, [X] remove
• Row actions: + increases qty, - decreases qty (removes at 0), X removes row
• Header action: [CLEAR ALL ITEMS] with confirmation
Totals & Discount
• Display: Subtotal, Tax, Discount, TOTAL (bold, large font)
• Discount toggle: [Amount ₹] [Percent %] with numeric input and [APPLY DISCOUNT]
button
• Show applied discount below input
Payment Section
• Buttons/dropdown: CASH, CARD, UPI, CHEQUE, DIGITAL_WALLET, OTHER
• Notes textarea (optional): "Customer notes..."
Bottom Action Bar
• [CLEAR CART], [INVENTORY CHECK], [PROFILE], [COMPLETE SALE] (primary,
disabled until cart not empty + payment selected + deviceId present)
Behaviour & API (Online)
• On each scan/search: GET /products/barcode/:barcode or GET /products?search=...
• On COMPLETE SALE: Generate x-idempotency-key UUID, build payload with deviceId,
paymentMethod, discountAmount, items
• POST /sales with idempotency header
• On success: Clear cart, navigate to Receipt Screen
• On failure (stock error): Show error toast, keep cart for correction
Behaviour & API (Offline)
• Detect via navigator.onLine === false or window.offline event
• Show yellow banner: "OFFLINE MODE – Sales will be saved and synced when back
online."
• On COMPLETE SALE: Save to IndexedDB/localStorage as pending sale with temp
invoiceNumber (OFF-<timestamp>)
• Navigate to Receipt Screen marked "Pending Sync"
4. RECEIPT SCREEN
User Story: Confirm sale, print, email receipt, start new sale.
Layout
• Header: "SALE RECEIPT" with status badge (Online: ✓ Completed / Offline: ⏳ Pending
Sync)
• Info: Invoice Number, Date & Time, Cashier Name, Device Name
• Items: Table rows with Product Name – Qty x Unit Price = Line Total
• Summary: Subtotal, Discount, Tax, TOTAL
• Payment Method, Payment Status
Actions
• [🖨 PRINT RECEIPT] – Browser print for receipt section
• [📧 EMAIL RECEIPT] – Modal input for customer@example.com; POST
/sales/:id/email-receipt
• [📋 SHIFT SUMMARY] – Navigate to Shift Summary screen
• [✅ NEW SALE] – Reset cart, return to POS Terminal
5. SHIFT SUMMARY
User Story: Cashier checks performance for the day/shift.
UI Layout
• Header: "SHIFT SUMMARY"
• Date controls: Quick buttons (Today, Yesterday) or date range picker
• KPI row (cards): Total Sales Amount, Total Transactions, Average Ticket Size, Total
Discount Given
• Payment breakdown: List with CASH, CARD, UPI, etc. amounts and transaction counts
Behaviour & API
• On load/filter change: GET /sales/shift-summary or with ?startDate=&endDate=
• Render: totalSalesAmount, totalTransactions, averageTicketSize, totalDiscountGiven,
paymentBreakdown[]
• [PRINT SUMMARY] – Browser print
• [BACK TO POS] – Return to POS Terminal
6. INVENTORY CHECK
User Story: Cashier checks stock levels before/during checkout.
UI Layout
• Header: "INVENTORY STATUS"
• Alert badges: "⚠ Low stock items: X", "🔴 Out of stock: Y"
• Sections: Low Stock Items (bullet list), Out of Stock Items (bullet list)
• Actions: [REFRESH], [BACK]
Behaviour & API
• On load: GET /inventory?lowStock=true
• Optional full view: GET /inventory
7. PRODUCT SEARCH MODAL
User Story: Cashier searches for products when barcode is missing/unreadable.
UI Layout
• Title: "Search Products"
• Search bar: "Search by name, SKU..."
• Results list: Product Name, SKU, Price, Stock status
• Actions: [ADD TO CART] on each row, Close (X / Back button)
Behaviour & API
• On typing: Debounced GET /products?search=query
• On [ADD TO CART]: Push to POS cart state, optionally keep modal open
8. CASHIER PROFILE
User Story: Cashier reviews/updates profile details and manages account.
UI Layout
• Header: "My Profile"
• Fields: Name (editable), Email (read-only), Phone (editable), Role (read-only), Store
Name (read-only)
• Buttons: [SAVE CHANGES], [CHANGE PASSWORD], [LOGOUT]
• Change Password Modal: Current Password, New Password, Confirm New Password
with requirements
Behaviour & API
• On open: GET /auth/me
• On save profile: PATCH /auth/me
• On change password: POST /auth/change-password
• On logout: POST /auth/logout, clear auth state, go to Login
9. OFFLINE MODE & SYNC
User Story: Cashier continues selling during internet drops with later sync.
Offline Mode
• On offline event: Show fixed yellow banner across top
• POS remains fully usable; all scans, cart changes work
• On Complete Sale: Save offline sale to IndexedDB/localStorage with temp
invoiceNumber (OFF-<timestamp>)
• Navigate to Receipt Screen marked "Pending Sync"
Sync when Online
• On online event: Read all pending offline sales
• POST /sync/sales with payload: batchId, deviceId, sales[] array
• UI shows progress: "Syncing offline sales... 2/5 completed"
• On success: Remove synced sales from local store
• On failure: Keep failed sales; show error reasons
• Update later views (Shift Summary, sales history) from server data
Production-level cashier UX flow aligned with backend API integration.