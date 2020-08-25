window.onload = function() {
        function addCss(src) {
            var head = document.head;
            var link = document.createElement("link");

            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = src;
            link.crossorigin = 'anonymous';

            head.appendChild(link);
        }

        function addJs(src) {
            var body = document.body;
            var script = document.createElement("script");

            script.src = src;
            script.crossorigin = 'anonymous';

            body.appendChild(script);
        }

        // Adding BootStrap StyleSheet
        addCss(
        "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        );

        // Adding BootStrap Javascript/JQuery Scripts
        addJs("https://code.jquery.com/jquery-3.5.1.slim.min.js");
        addJs("https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js");
        addJs("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js");

        // Appending the Bootstrap Toast Component into the website.
        document.body.innerHTML += (`
        <div style="position: fixed; bottom: 10; left:10;" class="toast" id="who-bought-what-toast" data-delay="3000" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <img src="..." class="rounded mr-2" alt="...">
                <strong class="mr-auto">
                MemeOClock.com
                </strong>
                
                <small class="text-muted" id="was-bought-when">
                just now 
                </small>
                
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="toast-body" id="toastNotification-content">
                See? Just like this.
            </div>
        </div>
        `);

        var availableProducts = [
            'BLACK LIVES MATTER Wall Clock',
            'UGH Wall Clock',
            'I\'m F**kin Late Wall Clock',
            'Screw This Wall Clock',
            'Dancer\'s Clock - and 5,6,7,8',
            'Quaratine Clock',
            'It\'s Wine O\' Clock Somewhere!',
            'Hello Goodbye Klaus Umbrella Academy Wall Clock',
            'MMMM Doooonut Simpsons Wall Clock'
        ];

        async function generateFullName() {
            const response = await fetch('https://randomuser.me/api/');
            const data = await response.json();

            return (data['results'][0]['name']['first'] +' '+ data['results'][0]['name']['last']);
        }

        function generateRandomNumber(maxInt, failSafe=false) {
            var finalNumber = Math.round(Math.random() * maxInt);

            if (failSafe === true) {
                if (finalNumber <= 7) {
                    return finalNumber + 7;
                }
            }

            return finalNumber;
        }

        function generateToastPopup() {
            $('#who-bought-what-toast').toast("show");
        }

        async function generateSalesNotification() {
            var fullname            = await generateFullName();
            var selectedProduct     = availableProducts[generateRandomNumber(6)];
            var whenBought          = generateRandomNumber(59) + 'm ago';
            var toastContentBody    = (
                fullname + ' purchased <em style="color: #d87d6a;">' +
                selectedProduct + '</em>'
            );
            
            var toastPopupWhenPurchased = document.getElementById('was-bought-when');
            var toastPopupWhoBoughtWhat = document.getElementById('toastNotification-content');

            toastPopupWhenPurchased.innerHTML = whenBought;
            toastPopupWhoBoughtWhat.innerHTML = toastContentBody;

            generateToastPopup();
        }

        var randomTimeInterval = (
            generateRandomNumber(20, failsafe=true) * 1000
        );

        function randomPopupInterval() {
            randomTimeInterval = (
                generateRandomNumber(20, failsafe=true) * 1000
            );
            generateSalesNotification();
            setTimeout(randomPopupInterval, randomTimeInterval);
        }
        randomPopupInterval();
    }
