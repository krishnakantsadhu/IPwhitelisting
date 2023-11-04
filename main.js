//const { ip_mapping } = require('./IP_property.js');
//const { checkIPwhiteListing , convert_CIDR_to_range } = require('./IP_whitelisting_util.js');


import { ip_mapping } from './IP_property.js';
import { checkIPwhiteListing , convert_CIDR_to_range } from './IP_whitelisting_util.js';

console.log(ip_mapping);

const cache_map = new Map(Object.entries(ip_mapping));

console.log(cache_map);
let obj = cache_map.get("k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9");
console.log("getObject :"+obj);
/*
if("0.0.0.1" >  "0.0.0.2")
{
    console.log("ture");
}else{
    console.log("false");
}
*/

obj = checkIPwhiteListing(cache_map, "x8y9z0w1v2u3t4s5r6q7p8o9n0m1l2k", "88.199.45.76")
console.log(`corp_code: ${obj.corp_code}`);
console.log(`enc_key_name: ${obj.enc_key_name}`);
console.log(`IP: ${obj.ip}`);


obj = convert_CIDR_to_range("3.58.1.97/12");
console.log(obj.firstIP);
console.log(obj.lastIP);
