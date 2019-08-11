import React, {Fragment, useState} from 'react'
import axios from 'axios';
import Progress from './Progress';
import Message from './Message';
import BorderWrapper from 'react-border-wrapper';


const FileUpload = () => {

  const [file,
    setFile] = useState();
  const [filename,
    setFilename] = useState('Choose File');
  // const [uploadedFile,
  //   setUploadedFile] = useState({});
  const [uploadPercentage,
    setUploadPercentage] = useState(0);
  const [message, 
    setMessage] = useState('');
  const [pred, setPred] = useState('')

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const t0 = performance.now();      
      const res = await axios
      .post('//83.212.89.217:5000/predict', formData, 
      {
          
          onUploadProgress: progressEvent => 
          {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
          setTimeout(() => setUploadPercentage(0), 15000);
          }
      })
      .then(response => 
        {
        
        setPred(response.data.predictions.label);
        const t1 = performance.now();
        console.log('Performance Total: ' + ((t1 - t0)/1000) + ' Seconds');
        console.log(res);
      });
      // const {fileName, filePath} = res.data;
      
      // setUploadedFile({fileName, filePath});
      setMessage('File Uploaded');
    } catch (error) {
      
    }
    
  }
  return (
    <Fragment>
      <BorderWrapper
        borderColour= "#00bcf1"
        borderWidth="1px"
        borderRadius="15px"
        borderType="solid"
        innerPadding="29px"
        topElement={<img src="http://mai.uom.gr/frontend/templates/4responsive_uom_2013/images/logo_uom.png" alt="maiLogo"/>}
        topPosition={0}
        topOffset="22px"
        topGap="0px"  
        rightElement={<img src="http://netcloud.uom.gr/wp-content/uploads/2019/05/cropped-logo_netcloud_v11.png" 
        width="80" height="40"
        alt="netcloudLogo"/>}    
        rightPosition={0}
        rightOffset="22px"
        rightGap="1px"
      >

        {message ? <Message msg={message} /> : null}
          <form onSubmit={onSubmit}>
            <div className="custom-file mb-4">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChange}/>
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
            </div>
            <Progress percentage={uploadPercentage}/>

            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
          </form>
        
      </BorderWrapper>
      <div>
        {(() => {
          switch (pred) {
            case "William":   return <BorderWrapper
                borderColour= "#00bcf1"
                borderWidth="2px"
                borderRadius="15px"
                borderType="solid"
                innerPadding="29px"
                topElement={<img src="http://mai.uom.gr/frontend/templates/4responsive_uom_2013/images/logo_uom.png" alt="maiLogo"/>}
                topPosition={0.10}
                topOffset="22px"
                topGap="1px"  
                rightElement={<img src="http://netcloud.uom.gr/wp-content/uploads/2019/05/cropped-logo_netcloud_v11.png" 
                width="80" height="40"
                alt="netcloudLogo"/>}    
                rightPosition={0.01}
                rightOffset="22px"
                rightGap="4px"
              >
            <div className='row mt-4'>            
              <div className='col-md-4 m-auto'>
                <img style={{ width: '100%' }} src="https://thessaloniki.gr/wp-content/uploads/2017/02/WHITE-TOWER-unesco.jpg" alt='' />
                <h3 className='text-center'>
                Τα τείχη άλλοτε θεμελιωμένα πάνω στον βραχώδη γήλοφο και άλλοτε πατώντας πάνω στα απομεινάρια της ρωμαϊκής οχύρωσης, κατηφορίζουν υψηλά και αγέρωχα μέχρι την οδό Αγίου Δημητρίου και εν συνεχεία ταπεινωμένα πλέον, μετά το 1889, προς τη θάλασσα. Δια μέσου της οδού Φιλικής Εταιρείας, όπου διατηρούνται ορατά τμήματα του προτειχίσματος και τριγωνικοί πρόβολοι του κυρίως τείχους, καταλήγουν στο Λευκό Πύργο, που υψώνεται στη συμβολή του θαλάσσιου με το χερσαίο τείχος. Ο πύργος στη μορφή που σώζεται σήμερα κτίστηκε στα τέλη του 15ου αι., στο πλαίσιο εκσυγχρονισμού των οχυρώσεων, στη θέση παλαιότερου βυζαντινού πύργου.
                Από τις πύλες του ανατολικού σκέλους του περιβόλου γνωστές είναι οι θέσεις δύο κύριων πυλών, πάνω στους δύο βασικούς οδικούς άξονες της πόλης, της Νέας Χρυσής Πύλης σε αντιστοιχία με τη Ληταία και της Κασσανδρεωτικής (ή πύλη της Καλαμαρίας), σε αντιστοιχία με τη Χρυσή Πύλη.
                Σήμερα φιλοξενεί το Μουσείο Πόλης.
                </h3>
              </div>
            </div>
        </BorderWrapper>            
            
            default:      return null;
          }
        })()}

            
      </div>
        
    </Fragment>
  )
}

export default FileUpload
