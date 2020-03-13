console.log('loaded')
$('.devoured').click(function(){
    const id = $(this).val()
    $.ajax({
        method: 'PUT',
        url: '/api/burger/'+id
    }).then(results=>{
        if(results === 'OK'){
            location.reload()
        }
    })
})
$('#newBurger').submit(function(event){
    event.preventDefault();
    const burgerName = $('#burgerName').val()
    $.post('/api/burger',{burgerName}, function(results){
        console.log(results)
        location.reload()

    })
})