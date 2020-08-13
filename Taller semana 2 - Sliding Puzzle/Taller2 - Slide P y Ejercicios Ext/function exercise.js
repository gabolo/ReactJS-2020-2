function allCap(w)
{
 w=w.split('');
 return s=w.map(function(x){return x.toUpperCase()});
}
function raizC(x)
{
    var i=1;
    var p=0;
    var r=0;
    

    while(x>0)
    {
        x=x-i;
        i=i+2;
        p++;
        if(x==0)
        {
          r=p;
        }
        else if(x<0)
        {
            r=p-1;
        }
    }
    return r;
}

function fib(num){
   var a=1;
   var b=0;
   var resp;

   for(var i=1;i<=num;i++)
   {
       resp=a+b;
       b=a;
       a=resp;
   }
   return resp;
}