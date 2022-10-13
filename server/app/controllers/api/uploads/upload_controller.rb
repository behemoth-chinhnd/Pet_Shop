module Api
  module Uploads
    class UploadController < ApplicationController
      before_action :auth?

      def create
        file = params[:file]
        service = ::Shared::Uploads::UploadValidateService.call(file: file)

        if service.success?
          blob = ActiveStorage::Blob.create_and_upload!(io: File.open(service.file), filename: file.original_filename)
          url = ENV["GOOGLE_CLOUD_BUCKET"].present? ? blob.url : url_for(blob)

          render json: { key: blob.key, url: url }
        else
          render json: { message: service.message, errors: service.errors }, status: :unprocessable_entity
        end
      end

      private

      def auth?
        authenticate!(:login)
      end
    end
  end
end
