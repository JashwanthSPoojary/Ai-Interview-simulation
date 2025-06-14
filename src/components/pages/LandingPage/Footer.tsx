import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h2 className="text-xl font-bold mb-4">InterviewAI</h2>

        <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
          <span>Built by</span>
          <span className="inline-flex items-center justify-center bg-green-100 rounded-full w-30 sm:h-5 h-10 mx-1">
            <span className="text-green-600 text-xs">Jashwanth S Poojary</span>
          </span>
          <span>and Check out my portfolio </span>
          <span className="ml-2 border border-black rounded-sm sm:w-24 w-30 h-5 my-2">
            <Link
              href="https://jashwanth.me"
              className="text-blue-500 text-xs "
              target="_blank"
              rel="noopener noreferrer"
            >
            jashwanth.me 
            </Link>
          </span>
        </div>

        <div className="mt-6">
          <ul className="flex flex-wrap justify-center gap-6">
            <li>
              <Link
                href="https://x.com/JashwantPoojary"
                className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5 mr-2" />X (Twitter)
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/jashwanth-s-poojary/"
                className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/JashwanthSPoojary"
                className="text-gray-700 hover:text-gray-900 inline-flex items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </Link>
            </li>
            <li>
              <Link
                href="mailto:jaswanthspoojary@gmail.com"
                className="text-gray-700 hover:text-gray-900 inline-flex items-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
