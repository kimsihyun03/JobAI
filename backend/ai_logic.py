import os
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# Gemini API 키 설정
os.environ["GOOGLE_API_KEY"] = "press yor key"

class JobAI:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)
        # 에러 방지를 위해 경로 절대경로 권장
        self.vector_db = Chroma(persist_directory="./chroma_db", embedding_function=self.embeddings)

    def crawl_and_save(self, keyword):
        try:
            url = f"https://search.naver.com/search.naver?where=news&query={keyword}+취업+전망"
            loader = WebBaseLoader(url)
            data = loader.load()
            splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
            docs = splitter.split_documents(data)
            self.vector_db.add_documents(docs)
            return True
        except Exception as e:
            print(f"Crawling Error: {e}")
            return False

    def get_answer(self, user_input, major):
        retriever = self.vector_db.as_retriever(search_kwargs={"k": 5})
        template = """당신은 AI 시대 취업 전략가입니다. 
        최신 뉴스 정보를 참고하여 사용자의 전공({major})에 얽매이지 말고 넓은 시야로 답하세요.
        
        Context: {context}
        Question: {question}
        
        결과에는 구체적인 직무 제안과 필요 역량을 포함해 주세요."""
        
        prompt = ChatPromptTemplate.from_template(template)
        
        # 람다 함수와 RunnablePassthrough를 이용한 체인 구성
        chain = (
            {"context": retriever, "question": RunnablePassthrough(), "major": lambda x: major}
            | prompt 
            | self.llm 
            | StrOutputParser()
        )
        return chain.invoke(user_input)

job_ai = JobAI()
