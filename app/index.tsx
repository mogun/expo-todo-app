import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Trash2 } from "@tamagui/lucide-icons";
import {
  Button,
  Form,
  Input,
  SizableText,
  XStack,
  YStack,
  Separator,
} from "tamagui";
import { H1 } from "tamagui";

interface Todo {
  id: string;
  thing: string;
}

export default function Index() {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo.trim()) {
      setTodoList([...todoList, { id: Date.now().toString(), thing: todo }]);
      setTodo("");
    }
  };

  const deleteTodo = (id: string) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const renderTodo = ({ item }: { item: Todo }) => {
    return (
      <YStack marginTop={10}>
        <XStack paddingHorizontal={10} alignItems="center" gap="$2">
          <SizableText flex={1}>{item.thing}</SizableText>
          <TouchableOpacity onPress={() => deleteTodo(item.id)}>
            <Button size="$2" icon={Trash2} />
          </TouchableOpacity>
        </XStack>
        <Separator paddingVertical={5} />
      </YStack>
    );
  };

  return (
    <YStack flex={1} flexWrap="wrap" marginHorizontal={10}>
      <H1 margin={10} alignItems="center">ToDo</H1>
      <Form onSubmit={addTodo}>
        <XStack>
          <Input
            flex={1}
            placeholder="やることを入力してください"
            value={todo}
            onChangeText={setTodo}
            marginRight={5}
          />
          <Form.Trigger asChild>
            <Button>追加</Button>
          </Form.Trigger>
        </XStack>
      </Form>
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={renderTodo}
      />
    </YStack>
  );
}
