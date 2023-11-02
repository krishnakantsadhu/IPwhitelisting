const arr_IPs = ["225.225.225.225", "1.1.14.1","225.225.225.221", "1.1.1.1","225.225.2125.225", "1.1.13.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","225.225.225.225", "1.1.1.1","198.168.0.1", "ewewewewewewe",];
const int_IPs = [3789677022, 3789677115,3789677022, 3789677115,3789677022, 3789677115,3789677022, 3789677115,3789677022, 3789677115,3789677022, 3789677115,3789677022, 3789677115,3789677025];

//============
const t1 = getMicroseconds();
const num = covertoLong("225.225.225.225");
if(int_IPs.includes(num)){
    console.log("true");
}else{
    console.log("false");
}
const t2 = getMicroseconds();
//console.log(t2);
console.log(t2-t1)

//==================
const t3 = getMicroseconds();
if(arr_IPs.includes("198.168.0.1")){
    console.log("true");
}else{
    console.log("false");
}
const t4 = getMicroseconds();
console.log(t4-t3)






//16909060
//67305985
//3789677025


function getMicroseconds() {
    const dateMilliseconds = new Date().getTime(); // Get milliseconds from Date
    const performanceMicroseconds = performance.now() * 1000; // Get microseconds from performance.now()
    const microseconds = dateMilliseconds * 1000 + performanceMicroseconds;
    return microseconds;
}

function coverIPtoLong (ip){

    const segment = ip.split('.');

    const seg_1 = parseInt(segment[0]) * 16777216;
    const seg_2 = parseInt(segment[1]) * 65536;
    const seg_3 = parseInt(segment[2]) * 256;
    const seg_4 = parseInt(segment[3]);

   // console.log((parseInt(segment[0]) * 16777216) + (parseInt(segment[1]) * 65536) + (parseInt(segment[2]) * 256) + parseInt(segment[3]));

    return seg_1 + seg_2 + seg_3 + seg_4;
    /*
    console.log(segment[0] * 16777216) ;
    console.log(segment[1] * 65536);
    console.log(segment[2] * 256) ;
    console.log(segment[3]);
    */

}



