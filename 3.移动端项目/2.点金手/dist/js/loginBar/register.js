var radioBtn = $('.radio');
for (var i = 0; i < radioBtn.length; i++) {
    radioBtn[i].index = i;
    radioBtn[i].onclick = function() {
        var length = this.classList.length;
        if(length == 1) {
            for (var i = 0; i < radioBtn.length; i++) {
                radioBtn[i].classList.remove('checked');
            }
            this.classList.add('checked');
        }
    }

}
