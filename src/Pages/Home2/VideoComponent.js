import './VideoComponent.css'; 
const VideoComponent = () => {
  return (
    <div className="videocomponent2">
        <div className="video-component">
        <div className="video-wrapper">
        <iframe
            className="video-iframe"
            src="https://www.youtube.com/embed/F-Jp6XGN92g"
            title="Faculty of Dentistry"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        ></iframe>
        </div>
        <div className="description-wrapper">
            <div className='textbackground'>
            <p>Watch this quick video to discover how to use Academic Oral Radiology for your radiology education needs. From uploading assignments to receiving professor evaluations, we've got you covered every step of the way.</p>
            </div>
        </div>
        </div>
  </div>
  );
};

export default VideoComponent;
