const SUPABASE_URL = "https://yvmaiuaitwyhkhsxvari.supabase.co";
const SUPABASE_KEY = "sb_publishable_O1BFpAxcpbB_Clh3ragvKQ_Az6Jvviy";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Elements
const btnConnect = document.getElementById("btnConnect");
const connectionStatus = document.getElementById("connectionStatus");
const statusText = document.getElementById("statusText");
const transactionTableBody = document.getElementById("transactionTableBody");


// LOAD ALL TRANSACTIONS
async function loadTransactions() {

    console.log("=== DATABASE DIAGNOSTIC ===");

    const { data, error, count, status } = await db
        .from("Transactions")
        .select("*", { count: "exact" });

    console.log("HTTP Status:", status);
    console.log("Database Error:", error);
    console.log("Total Records:", count);
    console.log("Retrieved Data:", data);

    if (error) {
        console.error("QUERY FAILED:", error.message);
        alert("Database Error: " + error.message);
        return;
    }

    if (data.length === 0) {
        console.warn("No records returned!");

        transactionTableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center;">
                    No transactions found.
                </td>
            </tr>
        `;

        return;
    }

    console.log("SUCCESS! Records found:", data.length);

    transactionTableBody.innerHTML = "";

    data.forEach(transaction => {

        const row = document.createElement("tr");

        const values = [
            transaction.id,
            transaction.created_at,
            transaction.Date,
            transaction.Payroll,
            transaction.Sender,
            transaction.Amount,
            transaction.Reciever,
            transaction.Purpose
        ];

        const labels = [
            "ID", "Logs", "Date", "Payroll",
            "Sender", "Amount", "Receiver", "Purpose/Definition"
        ];

        values.forEach((value, index) => {

            const cell = document.createElement("td");

            cell.setAttribute("data-label", labels[index]);

            cell.textContent = value ?? "";

            row.appendChild(cell);

        });

        transactionTableBody.appendChild(row);

    });
}


// CONNECTION TEST
btnConnect.addEventListener("click", async function () {

    btnConnect.disabled = true;
    btnConnect.textContent = "Connecting...";

    connectionStatus.className = "connection-status";
    statusText.textContent = "Connecting...";

    try {

        console.log("Testing Supabase connection...");

        // Test database access
        const { data, error } = await db
            .from("Transactions")
            .select("id")
            .limit(1);

        if (error) {
            throw error;
        }

        // Successful connection
        connectionStatus.className =
            "connection-status connected";

        statusText.textContent = "Connected";

        btnConnect.textContent = "Connected";

        console.log("Successfully connected to Supabase!");

        // Load database records
        await loadTransactions();

    } catch (error) {

        connectionStatus.className =
            "connection-status disconnected";

        statusText.textContent = "Connection Failed";

        btnConnect.textContent = "Retry Connection";

        console.error("Supabase Error:", error);

        alert(
            "Database connection failed:\n" +
            error.message
        );

    } finally {

        btnConnect.disabled = false;

    }

});