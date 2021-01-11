const deadline = `2021-09-07T19:03:20`;

    const createTimeData = function(deadline) {
        const t = Date.parse(deadline) - new Date(),
            days = Math.floor( t / (1000 * 60 * 60 * 24) ),
            hours = Math.floor( (t / (1000 * 60 * 60)) % 24 ),
            minutes = Math.floor( t / (1000 * 60) % 60),
            seconds = Math.floor( t / 1000 % 60);
        
            return { t, days, hours, minutes, seconds }
    }

    

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        updateData();
        let intId = setInterval(updateData, 1000);

        function updateData() {
            const timeData = createTimeData(deadline);
            if (timeData.t <= 0) {
                clearInterval(intId);
                timer.style.display = 'none';
                timer.previousElementSibling.style.display = 'none'
            }
            days.innerHTML = timeData.days < 10 ? "0"+timeData.days : timeData.days;
            hours.innerHTML = timeData.hours;
            minutes.innerHTML = timeData.minutes;
            seconds.innerHTML = timeData.seconds;

            
        }                                      
    }

    setClock(".timer", deadline)
