import { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button, Form, Input, SizableText } from "tamagui";
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
    console.log(todo);
    return (
      <View style={styles.todoItem}>
        <SizableText>{item.thing}</SizableText>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <SizableText>delete</SizableText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <H1>ToDo</H1>
      <Form onSubmit={addTodo}>
        <Input
          flex={1}
          placeholder="やることを入力してください"
          value={todo}
          onChangeText={setTodo}
        />
        <Form.Trigger asChild>
          <Button>追加</Button>
        </Form.Trigger>
      </Form>
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={renderTodo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  todoItem: {},
});
