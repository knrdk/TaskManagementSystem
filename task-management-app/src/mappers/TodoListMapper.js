import { defaultColor } from '../constants/availableColors';

function ConvertItemDto(item) {
  return {
    name: item.name,
    id: item.id,
    color: defaultColor,
  };
}

function ConverListDto(list) {
  return {
    id: list.id,
    name: list.name,
    todos: list.todos.map(ConvertItemDto),
  };
}

export default function ConvertApiDtoToLocalModel(lists) {
  return lists.map(ConverListDto);
}

