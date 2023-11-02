const ip_mapping = {

    "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5": {
        "IPs": ["192.168.0.1", "203.120.45.67", "10.0.0.254"],
        "corp_code": "corp_code_1",
        "enc_key_name": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6A7B8C9D0E1F2G3H4"
    },
    "x8y9z0w1v2u3t4s5r6q7p8o9n0m1l2k": {
        "IPs": ["172.16.8.128", "134.55.220.33", "88.199.45.76"],
        "IP_range": [
            {
                "first_IP": "198.168.1.0",
                "last_IP": "198.168.1.128"
            },
            {
                "first_IP": "198.167.1.0",
                "last_IP": "198.167.225.0"
            }
        ],
        "corp_code": "corp_code_2",
        "enc_key_name": "x8y9z0w1v2u3t4s5r6q7p8o9n0m1l2k3j4i5h6g7f8e9d0c1b2a3J4K5L6M7N8O9P0"
    },
    "k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9": {
        "IPs": ["198.76.23.55", "121.67.89.12", "172.31.0.1", "66.249.64.12"],
        "corp_code": "corp_code_3",
        "enc_key_name": "k4l5m6n7o8p9q1r2s3t4u5v6w7x8y9z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6"
    }

}
const cache_map = new Map(Object.entries(ip_mapping));

//console.log(cache_map);
//const obj = cache_map.get("k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9");
//console.log("getObject :"+obj);
/*
if("0.0.0.1" >  "0.0.0.2")
{
    console.log("ture");
}else{
    console.log("false");
}
*/
/*
const obj = checkIPwhiteListing(cache_map, "x8y9z0w1v2u3t4s5r6q7p8o9n0m1l2k", "198.168.1.129")
console.log(`corp_code ${obj.corp_code}`);
console.log(`enc_key_name ${obj.enc_key_name}`);
console.log(`enc_key_name ${obj.ip}`);
*/

const obj = conver_CIDR_to_range("3.58.1.97/12");
console.log(obj.firstIP);
console.log(obj.lastIP);


//======== function ==================

function checkIPwhiteListing(ip_map, client_id, client_ip) {
    let returnObject = {};
    let is_client_ip_found = false;
    let return_ip = "";
    const mapObject = ip_map.get(client_id);
    if (mapObject != undefined) {
        const map_IPs = mapObject.IPs;

        if (map_IPs.includes(client_ip)) {
            is_client_ip_found = true;
            return_ip = client_ip;
        } else if (mapObject.IP_range != undefined && mapObject.IP_range.length > 0) {
           // const num_client_ip = covertIPsToNumber(client_ip);
            for (let i = 0; i < mapObject.IP_range.length; i++) {
                const map_first_ip = mapObject.IP_range[i].first_IP;
                const map_last_ip = mapObject.IP_range[i].last_IP;

              //  const num_first_ip = covertIPsToNumber(map_first_ip);
              //  const num_last_ip = covertIPsToNumber(map_last_ip);

                //console.log(num_first_ip) 
                //console.log(num_client_ip);
                //console.log(num_last_ip);

                if (map_first_ip <= client_ip && client_ip <= map_last_ip) {
                    is_client_ip_found = true;
                    return_ip = `${map_first_ip} - ${map_last_ip}`;
                    break;
                }

            } // end of for loop

        }

    }

    if (is_client_ip_found) {
        returnObject = {
            "corp_code": mapObject.corp_code,
            "enc_key_name": mapObject.enc_key_name,
            "ip": return_ip
        }
    }else{
        returnObject = {
            "corp_code": null,
            "enc_key_name": null,
            "ip": null
        }
    }


    return returnObject;
}

function covertIPsToNumber(ip) {

    const segments = ip.split('.');

    const seg_1 = parseInt(segments[0]) * 16777216;
    const seg_2 = parseInt(segments[1]) * 65536;
    const seg_3 = parseInt(segments[2]) * 256;
    const seg_4 = parseInt(segments[3]);

    return seg_1 + seg_2 + seg_3 + seg_4;

}

function conver_CIDR_to_range(str_cidr){

    let returnObject = {};
    let fixed_bit = 32;
    
    const indexOfCharacter = str_cidr.indexOf('/');
    if( indexOfCharacter !== -1 && indexOfCharacter >= 8){
        fixed_bit = parseInt(str_cidr.substring(indexOfCharacter + 1));
    }

   // console.log("fixed_bit : "+fixed_bit);
    
    const ip =  str_cidr.substring(0,indexOfCharacter);

   // console.log("IP : "+ip);

    const segments = ip.split('.');

    let binaryIP = "";
    
    for(let i=0 ; i < segments.length; i++){
        let segment = (parseInt(segments[i]).toString(2));
        segment = "0".repeat(8 - segment.length) + segment;
        binaryIP += segment;
    }
  
    const firstBinaryIP = binaryIP.substring(0,fixed_bit)+"0".repeat(32-fixed_bit);
    const lastBinaryIP = binaryIP.substring(0,fixed_bit)+"1".repeat(32-fixed_bit); 

    const strFirstIP = parseInt(firstBinaryIP.substring(0,8),2)+"."+parseInt(firstBinaryIP.substring(8,16),2)+"."+parseInt(firstBinaryIP.substring(16,24),2)+"."+parseInt(firstBinaryIP.substring(24),2);
    const strLastIP = parseInt(lastBinaryIP.substring(0,8),2)+"."+parseInt(lastBinaryIP.substring(8,16),2)+"."+parseInt(lastBinaryIP.substring(16,24),2)+"."+parseInt(lastBinaryIP.substring(24),2);

    //console.log(binaryIP);
    //console.log(firstBinaryIP);
    //console.log(firstBinaryIP.substring(0,8)+"."+firstBinaryIP.substring(8,16)+"."+firstBinaryIP.substring(16,24)+"."+firstBinaryIP.substring(24));
    //console.log(lastBinaryIP);

    returnObject = {
        "firstIP" : strFirstIP,
        "lastIP" : strLastIP
    }

    return returnObject;

}

