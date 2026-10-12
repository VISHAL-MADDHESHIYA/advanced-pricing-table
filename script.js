/* =========================================
   ELEVATE — ADVANCED PRICING TABLE
   ========================================= */


/* =========================
   SELECT ELEMENTS
   ========================= */

const billingToggle =
    document.querySelector("#billingToggle");

const amounts =
    document.querySelectorAll(".amount");

const notes =
    document.querySelectorAll(".annual-note");

const themeToggle =
    document.querySelector("#themeToggle");

const themeIcon =
    document.querySelector("#themeIcon");

const compareToggle =
    document.querySelector("#compareToggle");

const comparisonTable =
    document.querySelector("#comparisonTable");

const toast =
    document.querySelector("#toast");

const ctaButtons =
    document.querySelectorAll(".cta");


/* =========================
   BILLING STATE
   ========================= */

let yearly = false;


/* =========================
   UPDATE PRICING
   ========================= */

function updatePricing() {

    amounts.forEach((amount) => {

        const value = yearly
            ? amount.dataset.yearly
            : amount.dataset.monthly;

        amount.textContent =
            Number(value).toLocaleString("en-IN");

    });


    notes.forEach((note) => {

        note.textContent = yearly
            ? "Billed annually · Save 20%"
            : "Billed monthly";

    });


    billingToggle.setAttribute(
        "aria-checked",
        String(yearly)
    );
}


/* =========================
   BILLING TOGGLE
   ========================= */

billingToggle.addEventListener(
    "click",
    () => {

        yearly = !yearly;

        updatePricing();

    }
);


/* =========================
   COMPARISON TABLE
   ========================= */

compareToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            !comparisonTable.hidden;


        comparisonTable.hidden =
            isOpen;


        compareToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );


        compareToggle.innerHTML = isOpen

            ? `Show comparison <span>↓</span>`

            : `Hide comparison <span>↑</span>`;
    }
);


/* =========================
   THEME MANAGEMENT
   ========================= */

function applyTheme(theme) {

    document.documentElement
        .dataset.theme = theme;


    const dark =
        theme === "dark";


    themeIcon.textContent =
        dark ? "☀" : "☾";


    themeToggle.setAttribute(
        "aria-label",
        dark
            ? "Switch to light theme"
            : "Switch to dark theme"
    );


    themeToggle.setAttribute(
        "title",
        dark
            ? "Switch to light theme"
            : "Switch to dark theme"
    );


    localStorage.setItem(
        "elevate-theme",
        theme
    );
}


/* =========================
   LOAD SAVED THEME
   ========================= */

const savedTheme =
    localStorage.getItem(
        "elevate-theme"
    );


const preferredDark =
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;


applyTheme(
    savedTheme ||
    (preferredDark ? "dark" : "light")
);


/* =========================
   THEME TOGGLE
   ========================= */

themeToggle.addEventListener(
    "click",
    () => {

        const currentTheme =
            document.documentElement
                .dataset.theme || "light";


        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        applyTheme(newTheme);

    }
);


/* =========================
   TOAST SYSTEM
   ========================= */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer = setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2600
    );
}


/* =========================
   CTA BUTTONS
   ========================= */

ctaButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const plan =
                    button.dataset.action;


                const billing =
                    yearly
                        ? "yearly"
                        : "monthly";


                showToast(
                    `${plan} selected · ${billing} billing`
                );

            }
        );

    }
);


/* =========================
   INITIALIZE
   ========================= */

updatePricing();