from transformers import pipeline
import spacy

grammar_checker = pipeline("text2text-generation", model="vennify/t5-base-grammar-correction")
sentiment_analyzer = pipeline("sentiment-analysis")
nlp = spacy.load("en_core_web_sm")

def analyze_grammar(text):
    try:
        return grammar_checker(text[:512])[0]['generated_text']
    except:
        return "Grammar analysis unavailable"

def analyze_tone(text):
    try:
        result = sentiment_analyzer(text[:512])[0]
        return {"sentiment": result['label'], "confidence": result['score']}
    except:
        return {"sentiment": "Neutral", "confidence": 0}

def keyword_match(resume, job_desc):
    try:
        job_keywords = [chunk.text.lower() for chunk in nlp(job_desc).noun_chunks]
        resume_keywords = [chunk.text.lower() for chunk in nlp(resume).noun_chunks]
        
        matched = list(set(resume_keywords) & set(job_keywords))
        missing = list(set(job_keywords) - set(resume_keywords))
        
        return {"matched": matched[:20], "missing": missing[:20]}
    except:
        return {"matched": [], "missing": []}

def calculate_score(keyword_analysis):
    base_score = 60
    base_score += len(keyword_analysis['matched']) * 2
    base_score -= len(keyword_analysis['missing']) * 1
    return min(max(base_score, 0), 100)

def analyze_resume(resume_text, job_desc):
    grammar_feedback = analyze_grammar(resume_text)
    tone_feedback = analyze_tone(resume_text)
    keyword_analysis = keyword_match(resume_text, job_desc)
    
    suggestions = []
    if len(keyword_analysis['missing']) > 0:
        suggestions.append(f"Add these keywords: {', '.join(keyword_analysis['missing'][:5])}")
    if "I" in resume_text or "my" in resume_text.lower():
        suggestions.append("Use more professional language (avoid 'I', 'my')")
    
    return {
        "overall_score": calculate_score(keyword_analysis),
        "grammar_feedback": grammar_feedback,
        "tone_feedback": tone_feedback,
        "keyword_analysis": keyword_analysis,
        "suggestions": suggestions
    }