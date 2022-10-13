module Shared
  module Uploads
    class UploadValidateService
      include Interactor

      before do
        context.type ||= "default"
        context.errors = []
      end

      def call
        file_type_upload = Settings.validate.file_upload.file_type
        file_upload_max_file_size = Settings.validate.file_upload.default.max_file_size

        ext = (context.file.content_type.include? "image") ?
                  context.file.content_type.gsub!("image/", ".") :
                  File.extname(context.file.original_filename)

        size = context.file.size

        context.fail!(message: I18n.t("services.upload_validate.errors.invalid_file_type")) if file_type_upload.exclude?(ext)
        context.fail!(message: I18n.t("services.upload_validate.errors.invalid_file_size")) if size > file_upload_max_file_size
        context.fail!(message: I18n.t("services.upload_validate.errors.file_validate_error")) if context.errors.present?
      end
    end
  end
end
