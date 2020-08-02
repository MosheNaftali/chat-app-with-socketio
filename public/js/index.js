$("#input-name").keypress((e) => {
  if (e.keyCode == 32) {
    $("#alert").text("ERROR: NO SE PERMITEN ESPACIOS EN BLACO");
    return false;
  }
});
