const pokemonNotFound = (res) => {
    return res.status(404).send({
      message: "pokemon non trouvé",
    });
  }

  export default pokemonNotFound;