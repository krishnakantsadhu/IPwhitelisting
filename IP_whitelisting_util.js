
//======== function ==================

export function checkIPwhiteListing(ip_map, client_id, client_ip) {
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

export function covertIPsToNumber(ip) {

    const segments = ip.split('.');

    const seg_1 = parseInt(segments[0]) * 16777216;
    const seg_2 = parseInt(segments[1]) * 65536;
    const seg_3 = parseInt(segments[2]) * 256;
    const seg_4 = parseInt(segments[3]);

    return seg_1 + seg_2 + seg_3 + seg_4;

}

export function convert_CIDR_to_range(str_cidr){

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

