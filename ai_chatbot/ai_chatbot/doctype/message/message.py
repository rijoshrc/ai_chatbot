# Copyright (c) 2024, Rijosh and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import os
import chromadb
from ai_chatbot.ai_chatbot.util.embedding_function import GeminiEmbeddingFunction
import google.generativeai as genai


class Message(Document):
    def after_insert(self):
        if self.type == "User":
            os.environ["GEMINI_API_KEY"] = "AIzaSyAQzM_DB_AD-hsOw4BhNbkU7NtS-q4eCbY"
            db_path = os.path.join("db", "vector")
            db = load_chroma_collection(db_path, self.conversation)
            query = self.text
            answer = generate_answer(db,query)
            print(answer,self.conversation)
            doc = frappe.new_doc('Message')
            doc.text = answer
            doc.conversation = self.conversation
            doc.type = "System"
            doc.insert()    
    pass


def load_chroma_collection(path, name):
    chroma_client = chromadb.PersistentClient(path=path)
    db = chroma_client.get_collection(name=name, embedding_function=GeminiEmbeddingFunction())
    return db

def generate_answer(db,query):
    #retrieve top 3 relevant text chunks
    relevant_text = get_relevant_passage(query,db,n_results=3)
    prompt = make_rag_prompt(query, 
                             relevant_passage="".join(relevant_text))
    answer = generate_response(prompt)

    return answer


def generate_response(prompt):
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        raise ValueError("Gemini API Key not provided. Please provide GEMINI_API_KEY as an environment variable")
    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel("gemini-1.5-flash")
    answer = model.generate_content(prompt)
    return answer.text


def get_relevant_passage(query, db, n_results):
  passage = db.query(query_texts=[query], n_results=n_results)['documents'][0]
  return passage


def make_rag_prompt(query, relevant_passage):
  escaped = relevant_passage.replace("'", "").replace('"', "").replace("\n", " ")

  prompt = ("""You are a helpful and informative chat bot build by Rijosh that answers questions using text from the reference passage included below. \
            This text is taken from a document that the user provided using RAG method.\
  Be sure to respond in a complete sentence, being comprehensive, including all relevant background information. \
  However, you are talking to a non-technical audience, so be sure to break down complicated concepts and \
  strike a friendly and converstional tone. \
  Read the passage section to generate a brief and topic oriented answer to the question.
  If the query is related to greeting or about you, answer correclty without depending on the passage.
  If the passage is irrelevant to the answer, you may answer with 'Sorry, I don't know'.
  QUESTION: '{query}'
  PASSAGE: '{relevant_passage}'

  ANSWER:
  """).format(query=query, relevant_passage=escaped)

  return prompt