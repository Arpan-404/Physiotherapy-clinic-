<?php
// Sample service data - In a real application, this would come from a database
$services = [
    1 => [
        'id' => 1,
        'name' => 'Physiotherapy',
        'icon' => '🏥',
        'description' => 'Comprehensive physiotherapy treatments designed to restore movement and function when someone is affected by injury, illness or disability.',
        'image' => 'https://via.placeholder.com/600x300/2c8577/ffffff?text=Physiotherapy',
        'details' => 'Our physiotherapy services include assessment, diagnosis, and treatment of various musculoskeletal conditions. We use evidence-based techniques and modern equipment to ensure the best outcomes for our patients.',
        'sub_services' => [
            ['name' => 'Initial Assessment', 'price' => '₹500'],
            ['name' => 'Manual Therapy Session', 'price' => '₹400'],
            ['name' => 'Exercise Therapy', 'price' => '₹350'],
            ['name' => 'Electrotherapy', 'price' => '₹300'],
            ['name' => 'Post-surgical Rehabilitation', 'price' => '₹600']
        ],
        'benefits' => [
            'Pain reduction and management',
            'Improved mobility and flexibility',
            'Faster recovery from injuries',
            'Prevention of future injuries',
            'Enhanced quality of life'
        ]
    ],
    2 => [
        'id' => 2,
        'name' => 'Orthopedic Rehabilitation',
        'icon' => '🦴',
        'description' => 'Specialized rehabilitation programs for orthopedic conditions and post-surgical recovery.',
        'image' => 'https://via.placeholder.com/600x300/2c8577/ffffff?text=Orthopedic+Rehab',
        'details' => 'Our orthopedic rehabilitation program is designed to help patients recover from bone, joint, and muscle injuries or surgeries. We provide personalized treatment plans to restore function and prevent re-injury.',
        'sub_services' => [
            ['name' => 'Post-fracture Rehabilitation', 'price' => '₹500'],
            ['name' => 'Joint Replacement Recovery', 'price' => '₹700'],
            ['name' => 'Sports Injury Treatment', 'price' => '₹600'],
            ['name' => 'Arthritis Management', 'price' => '₹450'],
            ['name' => 'Spine Care', 'price' => '₹550']
        ],
        'benefits' => [
            'Faster healing process',
            'Reduced pain and inflammation',
            'Restored range of motion',
            'Improved strength and stability',
            'Return to normal activities'
        ]
    ],
    3 => [
        'id' => 3,
        'name' => 'Neurological Therapy',
        'icon' => '🧠',
        'description' => 'Specialized therapy for neurological conditions affecting movement and function.',
        'image' => 'https://via.placeholder.com/600x300/2c8577/ffffff?text=Neuro+Therapy',
        'details' => 'Our neurological therapy services focus on helping patients with conditions affecting the nervous system. We use advanced techniques to improve motor skills, balance, and overall functional independence.',
        'sub_services' => [
            ['name' => 'Stroke Rehabilitation', 'price' => '₹800'],
            ['name' => 'Balance Training', 'price' => '₹400'],
            ['name' => 'Gait Training', 'price' => '₹500'],
            ['name' => 'Motor Skills Development', 'price' => '₹600'],
            ['name' => 'Cognitive Rehabilitation', 'price' => '₹700']
        ],
        'benefits' => [
            'Improved motor function',
            'Better balance and coordination',
            'Enhanced cognitive abilities',
            'Increased independence',
            'Better quality of life'
        ]
    ]
];

// Get service ID from URL parameter
$service_id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
$service = isset($services[$service_id]) ? $services[$service_id] : $services[1];

// WhatsApp number - replace with actual number
$whatsapp_number = "+919641568109";
$whatsapp_message = "Hi! I would like to book an appointment for " . $service['name'] . ". Can you help me with the scheduling?";
$whatsapp_url = "https://wa.me/" . str_replace(['+', ' ', '-'], '', $whatsapp_number) . "?text=" . urlencode($whatsapp_message);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $service['name']; ?> - Physio - The Therapeutic Moves</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .service-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #e8f5f3 0%, #f8f9fa 100%);
            padding-top: 70px;
        }
        
        .service-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .service-header {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        
        .service-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        .service-title {
            color: #2c8577;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .service-image {
            width: 100%;
            height: 250px;
            border-radius: 15px;
            overflow: hidden;
            margin: 1.5rem 0;
        }
        
        .service-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .service-description {
            font-size: 1.2rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 1rem;
        }
        
        .service-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        
        .service-details, .service-pricing {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }
        
        .content-section h3 {
            color: #2c8577;
            font-size: 1.4rem;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .service-benefits {
            list-style: none;
            padding: 0;
        }
        
        .service-benefits li {
            padding: 0.5rem 0;
            color: #666;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .service-benefits li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #2c8577;
            font-weight: bold;
        }
        
        .sub-services-list {
            list-style: none;
            padding: 0;
        }
        
        .sub-service-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            margin-bottom: 0.5rem;
            background: #f8f9fa;
            transition: background 0.3s ease;
        }
        
        .sub-service-item:hover {
            background: #e8f5f3;
        }
        
        .sub-service-name {
            font-weight: 600;
            color: #333;
        }
        
        .sub-service-price {
            color: #2c8577;
            font-weight: 700;
            font-size: 1.1rem;
        }
        
        .service-actions {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            margin-top: 2rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            text-align: center;
        }
        
        .btn-book {
            background: #2c8577;
            color: white;
            padding: 1.2rem 2.5rem;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.2rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            margin: 0.5rem;
        }
        
        .btn-book:hover {
            background: #245a4f;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(44, 133, 119, 0.3);
        }
        
        .btn-whatsapp {
            background: #25D366;
            color: white;
            padding: 1.2rem 2.5rem;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.2rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            margin: 0.5rem;
        }
        
        .btn-whatsapp:hover {
            background: #128C7E;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
        }
        
        .back-btn-page {
            background: #2c8577;
            color: white;
            padding: 0.8rem 1.5rem;
            text-decoration: none;
            border-radius: 25px;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            transition: all 0.3s ease;
        }
        
        .back-btn-page:hover {
            background: #245a4f;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .service-container {
                padding: 1rem;
            }
            
            .service-content {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            
            .service-header, .service-details, .service-pricing, .service-actions {
                padding: 1.5rem;
            }
            
            .service-title {
                font-size: 2rem;
            }
            
            .service-actions {
                text-align: center;
            }
            
            .btn-book, .btn-whatsapp {
                display: block;
                margin: 0.5rem 0;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header" id="header">
        <div class="logo">
            <img src="https://via.placeholder.com/32x32/2c8577/ffffff?text=LOGO" alt="Logo" class="logo-img">
            <span>Physio - The Therapeutic Moves</span>
        </div>
    </header>

    <div class="service-page">
        <div class="service-container">
            <a href="index.html" class="back-btn-page">
                ← Back to Home
            </a>
            
            <div class="service-header">
                <div class="service-icon"><?php echo $service['icon']; ?></div>
                <h1 class="service-title"><?php echo $service['name']; ?></h1>
                <div class="service-image">
                    <img src="<?php echo $service['image']; ?>" alt="<?php echo $service['name']; ?>">
                </div>
                <p class="service-description"><?php echo $service['description']; ?></p>
            </div>
            
            <div class="service-content">
                <div class="service-details content-section">
                    <h3>Service Details</h3>
                    <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">
                        <?php echo $service['details']; ?>
                    </p>
                    
                    <?php if (!empty($service['benefits'])): ?>
                    <h3>Benefits</h3>
                    <ul class="service-benefits">
                        <?php foreach ($service['benefits'] as $benefit): ?>
                        <li><?php echo $benefit; ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>
                </div>
                
                <div class="service-pricing content-section">
                    <h3>Treatments & Pricing</h3>
                    <?php if (!empty($service['sub_services'])): ?>
                    <div class="sub-services-list">
                        <?php foreach ($service['sub_services'] as $sub_service): ?>
                        <div class="sub-service-item">
                            <span class="sub-service-name"><?php echo $sub_service['name']; ?></span>
                            <span class="sub-service-price"><?php echo $sub_service['price']; ?></span>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <div class="service-actions">
                <h3 style="color: #2c8577; margin-bottom: 1.5rem;">Ready to get started?</h3>
                <div>
                    <a href="tel:+919641568109" class="btn-book">
                        📞 Call Now
                    </a>
                    <a href="<?php echo $whatsapp_url; ?>" target="_blank" class="btn-whatsapp">
                        📱 Book on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>


