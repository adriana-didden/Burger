console.log('loaded')

$('.devoured').click(function () {
    const id = $(this).val()
    console.log(id)
    $.ajax({
        method: 'PUT',
        url: '/api/burger/' + id
    }).then(results => {
        if (results === 'OK') {
            location.reload()
        }
    })
})

$('#newBurger').submit(function (event) {
    event.preventDefault();
    
    const burgerName = $('#burgerName').val()
    console.log(burgerName)
    $.post('/api/burger', { burger_name: burgerName, devoured:0 }).then(function (results) {
        console.log(results)
        if (results === "OK") {
            location.reload()
        }
    })
    
})
