if(!$){
    function $(str){
        var type = str.substr(0,1);
        var name = str.substr(1);
        if(type=="#"){
            return document.getElementById(name);
        }else if(type==".")
            return document.getElementsByClassName(name);
    }
}
