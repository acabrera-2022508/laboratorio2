import AnimalSchema from "./animal.model.js";

export const getAnimals = async (req, res) => {
  let allAnimals = await AnimalSchema.find({});

  res.send(allAnimals);
};

export const addAnimal = async (req, res) => {
  try {
    const data = req.body;
    const animal = new AnimalSchema(data);

    await animal.save();

    return res.send({ message: "Animal added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error adding animal", error });
  }
};

export const searchAnimal = async (req, res) => {
  try {
    let { name } = req.body;


    if (!req.params.name) {
      if (name.trim() !== '') {
        let animal = await AnimalSchema.find({ name });

        return res.send(animal)
      }

      return res.send("you are not sending data")
    } else {
      let animal = await AnimalSchema.find({ name: {$regex: req.params.name} });

      return res.send(animal)
    }

  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error searching animal", error });
  }
};

export const updateAnimal = async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    
    let animal = await AnimalSchema.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.send(animal);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error updating animal", error });
  }
}

export const deleteAnimal = async (req, res) => {
  try {
    let animal = await AnimalSchema.findOneAndDelete({ _id: req.params.id });

    return res.send(animal);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting animal", error });
  }
};