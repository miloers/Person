<?php
class SzSearch{
    private $sendData;
    private $sendUrl;

    public function getSearch($HScode,$CargoName,$LoginPassword){
        $this->sendData="Code=$HScode&CargoName=$CargoName&LoginPassword=$LoginPassword";
        $this->sendUrl="";
        $returnInfromation= $this->getCurl();
        return $returnInfromation;
    }
    public function getCurl(){
		    $data=$this->sendData;
		  	$curl_obj = curl_init();
		  	$url = $this->sendUrl;
		  	curl_setopt($curl_obj, CURLOPT_URL, $url);
		  	curl_setopt ($curl_obj, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
		  	curl_setopt($curl_obj, CURLOPT_HEADER, 0);
		  	curl_setopt($curl_obj, CURLOPT_RETURNTRANSFER, 1);
		  	curl_setopt($curl_obj, CURLOPT_POST, 1);
		  	curl_setopt($curl_obj, CURLOPT_POSTFIELDS, $data);
		  	curl_setopt($curl_obj, CURLOPT_HTTPHEADER, array(
		  	'Content-Type: application/x-www-form-urlencoded;',
		  	'Content-length:'.strlen($data)
	                    ));
  			curl_setopt($curl_obj, CURLOPT_SSL_VERIFYPEER, FALSE);
  			curl_setopt($curl_obj, CURLOPT_SSL_VERIFYHOST, FALSE);
  			$rtn = curl_exec($curl_obj);
  			if (!curl_errno($curl_obj))
  			{
  				 $Information=substr($rtn, 86,-9);
  				 return  $Information;
		  	}
			else
			{
			   echo 'Curl error: ' . curl_errno($curl_obj);
			}
			curl_close($curl_obj);
	}
}
?>