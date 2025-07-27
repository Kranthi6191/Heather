import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/FormHandler")
public class FormHandler extends HttpServlet {
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    String name = request.getParameter("name");
    String email = request.getParameter("email");
    if (name == null || email == null || name.trim().isEmpty() || email.trim().isEmpty()) {
      response.getWriter().println("Invalid input. Name and Email are required.");
      return;
    }
    response.getWriter().println("Hello, " + name + "! Your email is " + email + ".");
  }
}
