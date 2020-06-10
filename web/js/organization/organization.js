$(function() {
    $('.common-color').click(function() {
        $(this).css('color', 'red')
        $(this).siblings().css('color', '')
    })
})