from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from nlp_processor import analyze_resume
from utils import extract_text_from_pdf

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_resume_endpoint(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
):
    if resume.content_type != "application/pdf":
        raise HTTPException(400, "Only PDF files are accepted")
    
    try:
        resume_text = await extract_text_from_pdf(resume)
        return analyze_resume(resume_text, job_description)
    except Exception as e:
        raise HTTPException(500, f"Analysis failed: {str(e)}")

@app.get("/test")
def test_endpoint():
    return {"message": "API is working!"}