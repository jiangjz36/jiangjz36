$('.inviteFriend')[0].onclick = function() {
    $('.popUp')[0].style.display = 'block';
    $('.pp_inviteFriend')[0].style.display = 'block';

    $('.close')[0].onclick = function() {
        $('.popUp')[0].style.display = 'none';
        $('.pp_inviteFriend')[0].style.display = 'none';
    }
}
