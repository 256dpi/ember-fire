export function randomString() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function redirectPost(url, data) {
  let form = document.createElement('form');
  document.body.appendChild(form);
  form.method = 'post';
  form.action = url;
  for (let name in data) {
    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = data[name];
    form.appendChild(input);
  }
  form.submit();
}
