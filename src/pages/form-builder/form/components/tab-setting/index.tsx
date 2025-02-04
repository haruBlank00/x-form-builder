import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router";

export const TabSetting = () => {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const params = useParams<{ formId: string }>();

  useEffect(() => {
    generateLink();
  }, []);

  const generateLink = () => {
    /*
     * Quick hack :3
     */

    const isEditPage = params?.formId !== "create";
    if (!isEditPage) {
      return;
    }

    const newLink = `http://localhost:5173/form/${params.formId}`;
    setLink(newLink);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <div className="p-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Form Setting</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button onClick={generateLink}>Generate Shareable Link</Button>

          {link && (
            <div className="flex items-center space-x-2">
              <Input value={link} readOnly className="flex-1" />
              <Button variant="outline" onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
