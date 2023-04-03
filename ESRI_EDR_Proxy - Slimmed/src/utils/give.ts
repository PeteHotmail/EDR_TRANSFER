export function give(time,is_shop_open,work){
  return new Promise( function( myResolve, myReject ){
    if( is_shop_open ){
      setTimeout(function(){
       // work is 👇 getting done here
      myResolve( work() )
// Setting 👇 time here for 1 work
       }, time)
    }
    else{
      myReject( console.log("Our shop is closed") )
    }
    })
  }
  export default give;