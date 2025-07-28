import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
} from "react-native";
import axios from "axios";

export default function ProsecraftApp({ navigation }) {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm Prosecraft, your AI assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  const handleBack = () => {
    // Option 1: If using React Navigation
    if (navigation && navigation.goBack) {
      navigation.goBack();
    } 
    // Option 2: If using a different navigation system, replace with your navigation logic
    // For example: props.onBack() or your custom navigation function
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [userMessage, ...prev]);
    setInput("");
    setIsLoading(true);

    // Custom system prompt for Prosecraft AI
    const systemPrompt = `You are Prosecraft, a modern AI assistant. You are helpful, intelligent, and concise. Provide clear, accurate responses while maintaining a professional yet approachable tone.`;

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [
            { parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage.text}` }] },
          ],
          generationConfig: {
            temperature: 0.7, // Slightly more creative than JARVIS
            maxOutputTokens: 250,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            key: "YOUR_GEMINI_API_KEY_HERE", // <-- REPLACE WITH YOUR ACTUAL API KEY
          },
        }
      );

      const botText =
        response?.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "I apologize, but I'm unable to respond at the moment. Please try again.";

      const botReply = {
        id: Math.random().toString(),
        text: botText,
        sender: "bot",
      };

      setMessages((prev) => [botReply, ...prev]);
    } catch (error) {
      console.error("Gemini API error:", error?.response?.data || error.message);
      setMessages((prev) => [
        {
          id: Math.random().toString(),
          text: "Connection error. Please check your network and try again.",
          sender: "bot",
        },
        ...prev,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "user" ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text
        style={[
          styles.messageText,
          item.sender === "user" ? styles.userText : styles.botText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>LINKS</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, isLoading && styles.statusDotActive]} />
                <Text style={styles.headerSubtitle}>
                  {isLoading ? "Processing..." : "AI Ready"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.messagesContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            inverted
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Ask anything..."
              placeholderTextColor="#666666"
              style={styles.input}
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { opacity: input.trim() && !isLoading ? 1 : 0.5 },
              ]}
              onPress={handleSend}
              disabled={!input.trim() || isLoading}
            >
              <Text style={styles.sendButtonText}>
                {isLoading ? "●●●" : "→"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Dark theme with blur-like effects inspired by DeepSeek
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0a0a0a" // Deep black background
  },
  header: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#111111", // Very dark gray with transparency effect
    borderBottomWidth: 0.5,
    borderBottomColor: "#333333",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  backButtonText: {
    color: "#e5e5e5",
    fontSize: 18,
    fontWeight: "600",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: -42, // Compensate for back button to keep title centered
  },
  headerTitle: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "300", // Light weight for modern look
    letterSpacing: 6,
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#666666",
    marginRight: 8,
    opacity: 0.7,
  },
  statusDotActive: {
    backgroundColor: "#00ff88", // Bright green accent
    opacity: 1,
    shadowColor: "#00ff88",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#888888",
    fontWeight: "400",
    letterSpacing: 1,
    opacity: 0.9,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  messageList: { 
    padding: 20,
    paddingBottom: 24,
  },
  messageBubble: {
    maxWidth: "88%",
    padding: 18,
    marginVertical: 6,
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    borderTopRightRadius: 6,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#252525",
    borderTopLeftRadius: 6,
  },
  messageText: { 
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "400",
  },
  userText: { 
    color: "#e5e5e5",
    fontWeight: "400",
  },
  botText: { 
    color: "#cccccc",
  },
  inputContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 24 : 20,
    backgroundColor: "#111111",
    borderTopWidth: 0.5,
    borderTopColor: "#333333",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#1a1a1a",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
    paddingLeft: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#e5e5e5",
    paddingHorizontal: 18,
    paddingVertical: 16,
    maxHeight: 120,
    lineHeight: 20,
  },
  sendButton: {
    margin: 4,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  sendButtonText: {
    color: "#e5e5e5",
    fontSize: 18,
    fontWeight: "400",
  },
});
