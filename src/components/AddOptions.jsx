import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";

const AddOptions = () => {
  const [allOptions, setAllOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [itemName, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const [items, setItems] = useState([]);

  const showNewItems = () => {
    console.log(itemName);
    const newItems = {
      name: itemName,
      price: price,
      id: crypto.randomUUID(),
    };

    setItems((item) => [...item, newItems]);

    setName("");
    setPrice("");
  };

  const addNewItem = () => {
    const newItem = {
      title: title,
      isRequired: isRequired,
      id: crypto.randomUUID(),
      items: items,
    };
    setAllOptions((option) => [...option, newItem]);
    setTitle("");
    setItems([]);
  };

  const deleteOptions = (id) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };
  console.log(allOptions);
  console.log(items);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" color="gray" value="Gray" />
          </div>
          <TextInput
            id="title"
            placeholder="Input Gray"
            color="gray"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="accept"
            checked={isChecked}
            value="isRequired"
            onChange={() => setIsChecked((isChecked) => !isChecked)}
          />
          <Label htmlFor="accept" className="flex">
            Required ?
          </Label>
        </div>

        <div className="rounded-lg border border-gray-600 p-4">
          <div className="mb-2 flex items-center gap-2">
            <div>
              <div className="mb-1 block">
                <Label htmlFor="name" color="gray" value="Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Input Gray"
                color="gray"
                value={itemName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="price" color="gray" value="Price" />
              </div>
              <TextInput
                id="price"
                type="number"
                value={price}
                placeholder="Input Gray"
                color="gray"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <Button color="light" onClick={showNewItems}>
            Add option
          </Button>
          {items.map((item) => (
            <ShowItems item={item} deleteOptions={deleteOptions} />
          ))}
        </div>
        <Button gradientDuoTone="purpleToBlue" onClick={addNewItem}>
          Add Options
        </Button>
      </div>
    </div>
  );
};

function ShowItems({ item, deleteOptions }) {
  return (
    <div
      key={item.id}
      className="relative mx-2 mt-2 inline-block max-w-max items-center gap-1 rounded-lg bg-gray-200 p-2 text-gray-600"
    >
      <span
        className="absolute right-[-5%] top-[-40%] cursor-pointer text-xl font-bold text-red-600"
        onClick={() => deleteOptions(item?.id)}
      >
        x
      </span>
      <span>{item?.name}</span> {item.price && "="} <span>{item?.price}</span>
    </div>
  );
}

export default AddOptions;
