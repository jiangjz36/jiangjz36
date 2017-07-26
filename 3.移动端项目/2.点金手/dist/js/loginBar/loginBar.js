$("#passwordEye").onclick = function(ev) {
    var ev = ev || window.event;
    ev.stopPropagation();
    this.classList.toggle('eyeOpen');
    var className = this.className,
        ipt = $('.password')[0];
    if(className.length > 8) {
        ipt.type = 'text';
    }else {
        ipt.type = 'password';
    }
}
