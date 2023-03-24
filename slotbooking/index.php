<?php 

#PHP Code to get the user availabe time slots and display it to the user.

# Unique generated id
$object_unique_id = $_GET['id'];

#Enter your firestore unique key:
$firestore_key = "";
#Provide your firestore project ID Here
$project_id = "";
#Provide your collection name  Here
$collection_name = "events";



# Make API Call and get the availlable time details
$url = "https://firestore.googleapis.com/v1/projects/".$project_id."/databases/(default)/documents/".$collection_name."/".$object_unique_id;
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_URL => $url . '?key='.$firestore_key,
    CURLOPT_USERAGENT => 'cURL',
));

$response = curl_exec( $curl );

curl_close( $curl );

$response = json_decode($response,true);


?>
 <?php 

require_once (__DIR__.'/includes/cdns.php');

?>

<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="includes/styles.css">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Calendar</title>
</head>
<body>
  <div class="curvedheader">

    <div class="header">
    <img src="assets/logo.png" height="150"  width="150" />

        <div class="title">
        Calendar
        </div>

        <div class="subtitle">
        You can now easily book into my free time ! Ofcourse, not without my permission.
        </div>
    </div>

    <div class="content">

    <div class="row" >
            <div class="col-md-6">
                    <label>Title *</label>   <i class="fas fa-chevron-circle-right" style="color:#AD40AF"></i> 
                            <div class="input-group">
                            <input type="text" class="form-control" name="invoicerefnumber" id="invoicerefnumber"  value="" autocomplete="off" >
                                <div class="input-group-append">
                                <span class="input-group-text" style="background-color:#AD40AF"><ion-icon name="calendar-outline" style="color:white"></ion-icon></span>
                            </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <label>Location </label>   <i class="fas fa-chevron-circle-right" style="color:#AD40AF"></i> 
                            <div class="input-group">
                            <input type="text" class="form-control" name="invoicerefnumber" id="invoicerefnumber"  value="" autocomplete="off" >
                                <div class="input-group-append" >
                                <span class="input-group-text" style="background-color:#AD40AF"><ion-icon name="location-outline" style="color:white"></ion-icon></span>
                            </div>
                    </div>
                </div>

        </div>
                <div class="table">

                            <table class="styled-table" style="width:100%"  >
                            <thead >
                            <tr>
                                <th colspan="2">Available Slots</th>
                            </tr>

                            </thead>
                            <tbody >
                               
                            
                                <?php
                                $date = explode("T",$response['fields']["date"]["timestampValue"])[0];

                                foreach ($response['fields']['availability']['arrayValue'] as $availabilty){
                                    echo' <tr>
                                    <td> <i class="fa-solid fa-calendar-days" style="color:#AD40AF"></i>    '.$date.' <i class="fa-solid fa-clock" style="color:#AD40AF"></i>  '.date("h:i",$availabilty[0]['integerValue'] / 1000).' - '.date("h:i",$availabilty[1]['integerValue'] / 1000).'</td>
                                    <td><button class="btn " style="background-color:#AD40AF"  ><i class="fa-solid fa-calendar-plus fa-2x" style="color:white"></i></button></td>
                                </tr>';

                                }
                                
                               



                                ?>

                            </tbody>
                            </table>
                </div>

              
      
    </div>


    
  </div>
 
</body>
</html>

