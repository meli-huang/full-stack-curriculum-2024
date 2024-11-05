import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

function PokemonCard(props) {
  const pokemonName = props.pokemon.name;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`;

  return (
    <Card sx={{ margin: 1 }}>
      <CardActionArea component={Link} to={`${pokemonName}`}>
        <CardMedia component="img" height='120' image={imageUrl}>
        </CardMedia>
        <CardContent>
          <Typography>
            {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PokemonCard;
