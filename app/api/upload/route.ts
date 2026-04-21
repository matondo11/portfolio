import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary-server";

export const runtime = "nodejs";

const MAX_UPLOAD_SIZE = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured." },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folderInput = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "A file upload is required." },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      return NextResponse.json(
        { error: "The selected file is too large." },
        { status: 400 }
      );
    }

    const folder =
      typeof folderInput === "string" && folderInput.trim()
        ? folderInput.replace(/[^a-zA-Z0-9/_-]/g, "")
        : "portfolio/projects";

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise<{
      secure_url: string;
      resource_type: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
          overwrite: false,
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed."));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            resource_type: result.resource_type,
          });
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
      resourceType:
        uploadResult.resource_type === "video" ? "video" : "image",
    });
  } catch (error) {
    console.error("Failed to upload media:", error);
    return NextResponse.json(
      { error: "Failed to upload media." },
      { status: 500 }
    );
  }
}
