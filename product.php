<?php
// Sample product data - In a real application, this would come from a database
$products = [
    1 => [
        'id' => 1,
        'name' => 'Therapeutic Massage Oil',
        'price' => '₹299',
        'description' => 'Premium quality therapeutic massage oil specially formulated for muscle relief and relaxation. Contains natural essential oils that help reduce inflammation and promote healing.',
        'images' => [
            'https://via.placeholder.com/400x300/2c8577/ffffff?text=Massage+Oil+1',
            'https://via.placeholder.com/400x300/2c8577/ffffff?text=Massage+Oil+2',
            'https://via.placeholder.com/400x300/2c8577/ffffff?text=Massage+Oil+3'
        ],
        'features' => [
            'Natural essential oils',
            'Anti-inflammatory properties',
            'Suitable for all skin types',
            '100ml bottle',
            'Clinically tested'
        ]
    ],
    2 => [
        'id' => 2,
        'name' => 'Posture Correction Belt',
        'price' => '₹1,299',
        'description' => 'Advanced posture correction belt designed to improve spinal alignment and reduce back pain. Made with breathable materials for all-day comfort.',
        'images' => [
            'https://via.placeholder.com/400x300/2c8577/ffffff?text=Posture+Belt+1',
            'https://via.placeholder.com/400x300/2c8577/ffffff?text=Posture+Belt+2'
        ],
        'features' => [
            'Adjustable straps',
            'Breathable fabric',
            'Lightweight design',
            'Suitable for all ages',
            'Doctor recommended'
        ]
    ],
    3 => [
        'id' => 3,
        'name' => 'Therapeutic Heat Pad',
        'price' => '₹899',
        'description' => 'Electric heating pad for targeted pain relief and muscle relaxation. Features multiple heat settings and automatic shut-off for safety.',
        'images' => [
            'https://via.placeholder.com/400x300/2c8577/ffffff?text=Heat+Pad+1',
            'https://via.placeholder.com/400x300/2c8577/ffffff?text=Heat+Pad+2'
        ],
        'features' => [
            '3 heat settings',
            'Auto shut-off',
            'Washable cover',
            '12x15 inch size',
            '2-year warranty'
        ]
    ]
];

// Get product ID from URL parameter
$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
$product = isset($products[$product_id]) ? $products[$product_id] : $products[1];

// WhatsApp number - replace with actual number
$whatsapp_number = "+919641568109";
$whatsapp_message = "Hi! I'm interested in " . $product['name'] . " (" . $product['price'] . "). Can you provide more details?";
$whatsapp_url = "https://wa.me/" . str_replace(['+', ' ', '-'], '', $whatsapp_number) . "?text=" . urlencode($whatsapp_message);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $product['name']; ?> - Physio - The Therapeutic Moves</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .product-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #e8f5f3 0%, #f8f9fa 100%);
            padding-top: 70px;
        }
        
        .product-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .product-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .product-images {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .main-image {
            width: 100%;
            height: 400px;
            border-radius: 15px;
            overflow: hidden;
            background: #f8f9fa;
        }
        
        .main-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        
        .main-image img:hover {
            transform: scale(1.05);
        }
        
        .thumbnail-images {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
        }
        
        .thumbnail {
            width: 80px;
            height: 80px;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            border: 2px solid transparent;
            transition: border-color 0.3s;
            flex-shrink: 0;
        }
        
        .thumbnail.active {
            border-color: #2c8577;
        }
        
        .thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .product-info {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .product-info h1 {
            color: #2c8577;
            font-size: 2.5rem;
            font-weight: 700;
            margin: 0;
        }
        
        .product-price {
            font-size: 2.8rem;
            font-weight: 700;
            color: #2c8577;
        }
        
        .product-description {
            color: #666;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .product-features {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 12px;
        }
        
        .product-features h3 {
            color: #2c8577;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .features-list {
            list-style: none;
            padding: 0;
        }
        
        .features-list li {
            padding: 0.5rem 0;
            color: #666;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .features-list li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #2c8577;
            font-weight: bold;
        }
        
        .product-actions {
            display: flex;
            gap: 1rem;
            margin-top: auto;
        }
        
        .btn-whatsapp {
            background: #25D366;
            color: white;
            padding: 1.2rem 2rem;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            flex: 1;
            justify-content: center;
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
            .product-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
                padding: 1.5rem;
            }
            
            .product-container {
                padding: 1rem;
            }
            
            .product-info h1 {
                font-size: 2rem;
            }
            
            .product-price {
                font-size: 2.2rem;
            }
            
            .main-image {
                height: 300px;
            }
            
            .product-actions {
                flex-direction: column;
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

    <div class="product-page">
        <div class="product-container">
            <a href="index.html" class="back-btn-page">
                ← Back to Home
            </a>
            
            <div class="product-grid">
                <div class="product-images">
                    <div class="main-image">
                        <img src="<?php echo $product['images'][0]; ?>" alt="<?php echo $product['name']; ?>" id="mainProductImg">
                    </div>
                    <?php if (count($product['images']) > 1): ?>
                    <div class="thumbnail-images">
                        <?php foreach ($product['images'] as $index => $image): ?>
                        <div class="thumbnail <?php echo $index === 0 ? 'active' : ''; ?>" onclick="changeMainImage('<?php echo $image; ?>', this)">
                            <img src="<?php echo $image; ?>" alt="<?php echo $product['name']; ?> - Image <?php echo $index + 1; ?>">
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <?php endif; ?>
                </div>
                
                <div class="product-info">
                    <h1><?php echo $product['name']; ?></h1>
                    <div class="product-price"><?php echo $product['price']; ?></div>
                    <div class="product-description">
                        <?php echo $product['description']; ?>
                    </div>
                    
                    <?php if (!empty($product['features'])): ?>
                    <div class="product-features">
                        <h3>Key Features</h3>
                        <ul class="features-list">
                            <?php foreach ($product['features'] as $feature): ?>
                            <li><?php echo $feature; ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php endif; ?>
                    
                    <div class="product-actions">
                        <a href="<?php echo $whatsapp_url; ?>" target="_blank" class="btn-whatsapp">
                            <span>📱</span> Buy Now on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function changeMainImage(src, thumbnail) {
            document.getElementById('mainProductImg').src = src;
            
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
        }
    </script>
</body>
</html>

