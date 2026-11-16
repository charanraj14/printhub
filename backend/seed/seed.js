
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const User = require("../src/models/User");
const Category = require("../src/models/Category");
const Product = require("../src/models/Product");

const categories = [
    {
        name: "Business Cards",
        slug: "business-cards",
        description: "Professional custom business cards"
    },
    {
        name: "Marketing Materials",
        slug: "marketing-materials",
        description: "Flyers, brochures and promotional materials"
    },
    {
        name: "Packaging",
        slug: "packaging",
        description: "Custom packaging boxes and labels"
    },
    {
        name: "Apparel",
        slug: "apparel",
        description: "Custom printed clothing and merchandise"
    },
    {
        name: "Corporate Gifts",
        slug: "corporate-gifts",
        description: "Personalized corporate gifts"
    },
    {
        name: "Photo Gifts",
        slug: "photo-gifts",
        description: "Personalized photo gifts and frames"
    }
];

const seedDatabase = async () => {
    try {
        console.log("\n========== weprint SEED STARTED ==========\n");

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in backend/.env");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        const adminEmail = "admin@weprint.local";
        const customerEmail = "customer@weprint.local";

        let admin = await User.findOne({ email: adminEmail });

        if (!admin) {
            const hashedPassword = await bcrypt.hash("Admin123!", 10);

            admin = await User.create({
                name: "weprint Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin"
            });

            console.log("Admin user created successfully");
        } else {
            console.log("Admin user already exists");
        }

        let customer = await User.findOne({ email: customerEmail });

        if (!customer) {
            const hashedPassword = await bcrypt.hash("Customer123!", 10);

            customer = await User.create({
                name: "weprint Customer",
                email: customerEmail,
                password: hashedPassword,
                role: "customer"
            });

            console.log("Demo customer created successfully");
        } else {
            console.log("Demo customer already exists");
        }

        console.log("\nCreating categories...");

        for (const categoryData of categories) {
            const existingCategory = await Category.findOne({
                slug: categoryData.slug
            });

            if (!existingCategory) {
                await Category.create(categoryData);
                console.log(`Category created: ${categoryData.name}`);
            } else {
                console.log(`Category already exists: ${categoryData.name}`);
            }
        }

        console.log("\nCreating sample products...");

        const productData = [
            {
                name: "Premium Business Cards",
                slug: "premium-business-cards",
                description: "High-quality professional business cards",
                price: 499,
                category: "Business Cards",
                images: [],
                stock: 500,
                isActive: true,
                customizationOptions: {
                    sizes: ["Standard", "Square"],
                    materials: ["Matte", "Glossy"],
                    colors: ["White", "Custom"],
                    minQuantity: 100
                }
            },
            {
                name: "Custom Flyers",
                slug: "custom-flyers",
                description: "Professional promotional flyers",
                price: 799,
                category: "Marketing Materials",
                images: [],
                stock: 1000,
                isActive: true,
                customizationOptions: {
                    sizes: ["A4", "A5"],
                    materials: ["Matte", "Glossy"],
                    colors: ["Full Color"],
                    minQuantity: 100
                }
            },
            {
                name: "Custom Packaging Boxes",
                slug: "custom-packaging-boxes",
                description: "Branded packaging boxes for businesses",
                price: 1499,
                category: "Packaging",
                images: [],
                stock: 300,
                isActive: true,
                customizationOptions: {
                    sizes: ["Small", "Medium", "Large"],
                    materials: ["Kraft", "Cardboard"],
                    colors: ["Brown", "White", "Custom"],
                    minQuantity: 50
                }
            },
            {
                name: "Custom Printed T-Shirt",
                slug: "custom-printed-tshirt",
                description: "Personalized cotton printed T-shirts",
                price: 599,
                category: "Apparel",
                images: [],
                stock: 200,
                isActive: true,
                customizationOptions: {
                    sizes: ["S", "M", "L", "XL", "XXL"],
                    materials: ["Cotton"],
                    colors: ["Black", "White", "Blue"],
                    minQuantity: 1
                }
            },
            {
                name: "Corporate Gift Kit",
                slug: "corporate-gift-kit",
                description: "Branded corporate employee gift kit",
                price: 1999,
                category: "Corporate Gifts",
                images: [],
                stock: 150,
                isActive: true,
                customizationOptions: {
                    sizes: ["Standard"],
                    materials: ["Premium"],
                    colors: ["Black", "Blue", "Custom"],
                    minQuantity: 10
                }
            },
            {
                name: "Personalized Photo Frame",
                slug: "personalized-photo-frame",
                description: "Customized photo frame for gifting",
                price: 899,
                category: "Photo Gifts",
                images: [],
                stock: 100,
                isActive: true,
                customizationOptions: {
                    sizes: ["4x6", "5x7", "8x10"],
                    materials: ["Wood", "Acrylic"],
                    colors: ["Black", "White", "Natural"],
                    minQuantity: 1
                }
            }
        ];

        for (const product of productData) {
            const existingProduct = await Product.findOne({
                slug: product.slug
            });

            if (!existingProduct) {
                await Product.create(product);
                console.log(`Product created: ${product.name}`);
            } else {
                console.log(`Product already exists: ${product.name}`);
            }
        }

        console.log("\n========== SEED COMPLETED SUCCESSFULLY ==========");
        console.log("Admin Email: admin@weprint.local");
        console.log("Admin Password: Admin123!");
        console.log("Customer Email: customer@weprint.local");
        console.log("Customer Password: Customer123!");
        console.log("===============================================\n");

    } catch (error) {
        console.error("\nSEED FAILED:", error.message);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("MongoDB connection closed");
        }
    }
};

seedDatabase();
