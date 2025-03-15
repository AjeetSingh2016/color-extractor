export async function GET() {
    try {
      const response = await fetch("https://ncert-epub.s3.us-east-1.amazonaws.com/test/colors.json");
  
      if (!response.ok) {
        throw new Error(`Failed to fetch colors: ${response.status}`);
      }
  
      const data = await response.json();
  
      return Response.json(data, { status: 200 });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
  
  