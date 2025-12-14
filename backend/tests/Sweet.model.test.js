const Sweet = require("../src/models/Sweet");

describe("Sweet Model", () => {

  it("should create a sweet successfully with valid data", async () => {
    const sweetData = {
      name: "Gulab Jamun",
      price: 50,
      category: "Milk Sweets",
      description: "Soft milk-solid balls soaked in sugar syrup"
    };

    const sweet = new Sweet(sweetData);
    const savedSweet = await sweet.save();

    expect(savedSweet._id).toBeDefined();
    expect(savedSweet.name).toBe(sweetData.name);
    expect(savedSweet.price).toBe(sweetData.price);
    expect(savedSweet.category).toBe(sweetData.category);
    expect(savedSweet.description).toBe(sweetData.description);
    expect(savedSweet.image).toBeUndefined();
  });

  it("should allow creating a sweet with an optional image", async () => {
    const sweetData = {
      name: "Rasgulla",
      price: 40,
      category: "Bengali Sweets",
      description: "Spongy cottage cheese balls in sugar syrup",
      image: "https://example.com/rasgulla.jpg"
    };

    const sweet = await Sweet.create(sweetData);

    expect(sweet.image).toBe(sweetData.image);
  });

  it("should fail if required fields are missing", async () => {
    const sweet = new Sweet({});

    let err;
    try {
      await sweet.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.name).toBeDefined();
    expect(err.errors.price).toBeDefined();
    expect(err.errors.category).toBeDefined();
    expect(err.errors.description).toBeDefined();
  });

  it("should fail if price is negative", async () => {
    const sweetData = {
      name: "Kaju Katli",
      price: -100,
      category: "Dry Fruit Sweets",
      description: "Cashew-based sweet"
    };

    let err;
    try {
      await Sweet.create(sweetData);
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.price).toBeDefined();
  });

});
