import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Button from "@/components/Button";

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
        <Text style={styles.todoText}>{item.thing}</Text>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Text style={styles.deleteButton}>delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>ToDo</Text>
      <TextInput
        style={styles.textInput}
        multiline={false}
        placeholder="やることを入力してください"
        value={todo}
        onChangeText={setTodo}
      />
      <Button label="追加" onPress={addTodo} />
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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  todoItem: {},
  todoText: {},
  deleteButton: {},
});
