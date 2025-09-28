
import { Camera, Upload, Repeat, Clock, ChevronRight, Zap } from 'lucide-react';
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const CropHealthScanner = () => {

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [image_captured, setImage_captured] = useState(null); // New variable to store captured image
    const [mirrored, setMirrored] = useState(false);
    const [facingMode, setFacingMode] = useState("environment"); // Track camera facing mode

    // Video constraints with dynamic facing mode
    const videoConstraints = {
        width: 600,
        height: 600,
        facingMode: facingMode // Dynamic camera selection
    };

    // Function to switch camera
    const switchCamera = () => {
        setFacingMode(prevMode => prevMode === "environment" ? "user" : "environment");
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        setImage_captured(imageSrc); // Save to image_captured variable
        console.log('Image captured and saved to image_captured variable:', imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
        setImage_captured(null); // Clear the captured image variable
    };

    //
    const [selectedImage, setSelectedImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                simulateScan();
            };
            reader.readAsDataURL(file);
        }
    };

    const simulateScan = () => {
        setIsScanning(true);
        setScanResult(null);

        setTimeout(() => {
            setIsScanning(false);
            setScanResult({
                disease: "टमाटर पत्ता",
                confidence: "85%",
                status: "प्रारंभिक छत्रा रोग",
                recommendations: "2 घंटे पहले"
            });
        }, 2000);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };


    return (
        <div className="sm-max-w-[80%] px-6 py-6 lg:px-44 mx-auto bg-white ">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-green-800 mb-2">फसल स्वास्थ्य स्कैनर</h1>
                <p className="text-gray-600 text-sm">कोट और बीमारियों का पता लगाने के लिए फोटो लें</p>
            </div>

            {/* Camera/Upload Area */}
            <div
                // onClick={triggerFileInput}
                className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-dashed border-green-400 rounded-xl p-3 text-center mb-5 cursor-pointer hover:from-green-100 hover:to-green-200 transition-all duration-300"
            >
                <div className="mb-4">
                    {imgSrc ? (
                        <img
                            src={imgSrc}
                            alt="captured"
                            className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
                        />
                    ) : (
                        <Webcam
                            height={600}
                            width={600}
                            ref={webcamRef}
                            mirrored={mirrored}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={0.8}
                            videoConstraints={videoConstraints}
                            className="w-full max-w-lg mx-auto rounded-lg"
                        />
                    )}
                </div>
            </div>

            {/* Camera Button */}
            {imgSrc ? (<div>
                <button
                    onClick={retake}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                    Retake photo
                </button>
                <button
                    onClick={retake}
                    className="w-full bg-amber-500 text-white py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                    send
                </button>

            </div>
            ) : (<button
                onClick={capture}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
            >
                <Camera className="w-5 h-5" />
                फोटो लें
            </button>)}

            {/* switch camera */}

            <div className='flex gap-2' >
                <button
                    onClick={switchCamera}
                    className="h-auto px-6 py-2 mb-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors items-center justify-center"
                >
                    <Repeat className="w-5 h-5" />
                </button>


                {/* Upload Button */}
                <button
                    onClick={triggerFileInput}
                    className="w-full border border-green-600 text-green-600 py-2 rounded-xl font-medium mb-6 flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    गैलरी से अपलोड करें
                </button>
            </div>

            {/* Photo Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-2 mb-2">
                    <Camera className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <h3 className="font-medium text-yellow-800">फोटो टिप्स</h3>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• स्पष्ट, अच्छी रोशनी में फोटो लें</li>
                    <li>• प्रभावित पत्तियों या हिस्सों पर फोकस करें</li>
                    <li>• यदि संभव हो तो कई कोणों से फोटो लें</li>
                </ul>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                capture="environment"
            />

            {/* below section  */}

            {/* Header */}
            <h1 className="text-xl font-semibold text-gray-800 mb-6">हाल की स्कैन</h1>

            {/* Scan Results */}
            <div className="space-y-4">
                {/* Tomato Scan */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">🍅</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">टमाटर पत्ता</h3>
                                <div className="flex items-center space-x-1 text-sm text-green-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>प्राथमिक धब्बा रोग</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">85%</span>
                            <div className="w-10 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white">🌱</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                                मध्यम
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>2 घंटे पहले</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 text-blue-600 cursor-pointer">
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-sm">सुझाव देखें</span>
                        </div>
                    </div>
                </div>

                {/* Rice Scan */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-xl">🌾</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">चावल का पौधा</h3>
                                <div className="flex items-center space-x-1 text-sm text-gray-600">
                                    <span>स्वस्थ - कोई समस्या नहीं</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">92%</span>
                            <div className="w-10 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white">🌱</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                अच्छा
                            </span>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>1 दिन पहले</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Detection Section */}
            <div className="mt-8 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-800">AI-संचालित पहचान</h3>
                        <p className="text-sm text-gray-600">तुरंत 100+ बीमारियों और कीटों की पहचान करता है</p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default CropHealthScanner;